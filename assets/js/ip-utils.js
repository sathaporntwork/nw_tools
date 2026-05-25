/**
 * IP Address Validation and Conversion Utilities
 */

const IPUtils = {
    /**
     * Validate IPv4 address
     * @param {string} ip - IPv4 address to validate
     * @returns {boolean} - True if valid IPv4
     */
    isValidIPv4(ip) {
        const octets = ip.split('.');
        if (octets.length !== 4) return false;
        return octets.every(octet => {
            const num = parseInt(octet, 10);
            return !isNaN(num) && num >= 0 && num <= 255 && octet === num.toString();
        });
    },

    /**
     * Validate CIDR notation
     * @param {string} cidr - CIDR notation to validate
     * @returns {boolean} - True if valid CIDR
     */
    isValidCIDR(cidr) {
        const parts = cidr.split('/');
        if (parts.length !== 2) return false;
        const prefix = parseInt(parts[1], 10);
        return this.isValidIPv4(parts[0]) && !isNaN(prefix) && prefix >= 0 && prefix <= 32;
    },

    /**
     * Validate subnet mask
     * @param {string} mask - Subnet mask to validate
     * @returns {boolean} - True if valid subnet mask
     */
    isValidSubnetMask(mask) {
        if (!this.isValidIPv4(mask)) return false;
        const binary = mask.split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('');
        return /^1*0*$/.test(binary) && binary.includes('1');
    },

    /**
     * Convert IP address to long integer
     * @param {string} ip - IPv4 address
     * @returns {number} - Long integer representation
     */
    ipToLong(ip) {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
    },

    /**
     * Convert long integer to IP address
     * @param {number} long - Long integer
     * @returns {string} - IPv4 address
     */
    longToIP(long) {
        return [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.');
    },

    /**
     * Convert subnet mask to CIDR prefix
     * @param {string} mask - Subnet mask
     * @returns {number} - CIDR prefix length
     */
    netmaskToCIDR(mask) {
        const binary = mask.split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('');
        return binary.split('0')[0].length;
    },

    /**
     * Convert CIDR prefix to subnet mask
     * @param {number} cidr - CIDR prefix length
     * @returns {string} - Subnet mask
     */
    cidrToNetmask(cidr) {
        const mask = -1 << (32 - cidr);
        return [(mask >>> 24) & 255, (mask >>> 16) & 255, (mask >>> 8) & 255, mask & 255].join('.');
    },

    /**
     * Convert CIDR prefix to wildcard mask
     * @param {number} cidr - CIDR prefix length
     * @returns {string} - Wildcard mask
     */
    cidrToWildcard(cidr) {
        const subnetMask = this.cidrToNetmask(cidr);
        return subnetMask.split('.').map(octet => 255 - parseInt(octet, 10)).join('.');
    },

    /**
     * Validate wildcard mask
     * @param {string} wildcard - Wildcard mask to validate
     * @returns {boolean} - True if valid wildcard mask
     */
    isValidWildcardMask(wildcard) {
        if (!this.isValidIPv4(wildcard)) return false;
        const subnetMask = wildcard.split('.').map(octet => 255 - parseInt(octet, 10)).join('.');
        return this.isValidSubnetMask(subnetMask);
    },

    /**
     * Parse an IPv6 address into 8 normalized hextets
     * @param {string} ip - IPv6 address in full or compact form
     * @returns {string[] | null} - Array of 8 uppercase 4-char hextets or null when invalid
     */
    parseIPv6(ip) {
        if (typeof ip !== 'string') return null;

        const normalizedIp = ip.trim();
        if (!normalizedIp || normalizedIp.includes('.')) return null;

        const segments = normalizedIp.split('::');
        if (segments.length > 2) return null;

        const hasCompression = segments.length === 2;
        const [leftRaw = '', rightRaw = ''] = segments;
        const left = leftRaw ? leftRaw.split(':') : [];
        const right = rightRaw ? rightRaw.split(':') : [];
        const hextetPattern = /^[0-9a-fA-F]{1,4}$/;

        if (![...left, ...right].every(part => hextetPattern.test(part))) {
            return null;
        }

        const totalParts = left.length + right.length;
        if ((!hasCompression && totalParts !== 8) || (hasCompression && totalParts >= 8)) {
            return null;
        }

        const missingParts = hasCompression ? 8 - totalParts : 0;
        const expanded = [
            ...left,
            ...Array(missingParts).fill('0'),
            ...right
        ];

        return expanded.map(part => part.toUpperCase().padStart(4, '0'));
    },

    /**
     * Validate IPv6 address
     * @param {string} ip - IPv6 address to validate
     * @returns {boolean} - True if valid IPv6
     */
    isValidIPv6(ip) {
        return this.parseIPv6(ip) !== null;
    },

    /**
     * Expand IPv6 address to 8 hextets
     * @param {string} ip - IPv6 address
     * @returns {string | null} - Expanded IPv6 address or null when invalid
     */
    expandIPv6(ip) {
        const parts = this.parseIPv6(ip);
        return parts ? parts.join(':') : null;
    },

    /**
     * Compress IPv6 address using :: notation for the longest zero run
     * @param {string} ip - IPv6 address in full or compact form
     * @returns {string | null} - Compressed IPv6 address or null when invalid
     */
    compressIPv6(ip) {
        const parts = this.parseIPv6(ip);
        if (!parts) return null;

        const shortened = parts.map(part => part.replace(/^0+([0-9A-F]{1,3})$/i, '$1').replace(/^0+$/, '0'));
        let bestStart = -1;
        let bestLength = 0;
        let currentStart = -1;
        let currentLength = 0;

        for (let i = 0; i < shortened.length; i++) {
            if (shortened[i] === '0') {
                if (currentStart === -1) currentStart = i;
                currentLength++;
                if (currentLength > bestLength) {
                    bestStart = currentStart;
                    bestLength = currentLength;
                }
            } else {
                currentStart = -1;
                currentLength = 0;
            }
        }

        if (bestLength < 2) {
            return shortened.join(':');
        }

        const left = shortened.slice(0, bestStart).join(':');
        const right = shortened.slice(bestStart + bestLength).join(':');

        if (!left && !right) return '::';
        if (!left) return `::${right}`;
        if (!right) return `${left}::`;
        return `${left}::${right}`;
    },

    /**
     * Convert wildcard mask to subnet mask
     * @param {string} wildcard - Wildcard mask
     * @returns {string} - Subnet mask
     */
    wildcardToNetmask(wildcard) {
        return wildcard.split('.').map(octet => 255 - parseInt(octet, 10)).join('.');
    },

    /**
     * Convert number to 32-bit binary string with dots
     * @param {number} num - Integer
     * @returns {string} - Binary string (e.g. "11000000.10101000...")
     */
    toBinary(num) {
        let bin = (num >>> 0).toString(2);
        while (bin.length < 32) bin = '0' + bin;
        return bin.match(/.{1,8}/g).join('.');
    },

    /**
     * Get IP Class (A, B, C, D, E)
     * @param {number} ipNum - IP as long integer
     * @returns {string} - Class string
     */
    getIPClass(ipNum) {
        const firstOctet = (ipNum >>> 24) & 255;
        if (firstOctet < 128) return 'A';
        if (firstOctet < 192) return 'B';
        if (firstOctet < 224) return 'C';
        if (firstOctet < 240) return 'D (Multicast)';
        return 'E (Experimental)';
    }
};

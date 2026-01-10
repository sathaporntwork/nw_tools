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

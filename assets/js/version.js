/**
 * ============================================================
 * Network Tools Suite - Version Registry (Single Source of Truth)
 * ============================================================
 * SemVer: MAJOR.MINOR.PATCH
 *   MAJOR - breaking change / full redesign of the tool
 *   MINOR - new feature or notable behavior change
 *   PATCH - fix, cosmetic or infrastructure-only change
 *
 * How to bump:
 *   - Changed one tool's HTML/JS?  -> bump that tool's entry below.
 *   - Changed shared assets (common.css, fonts, theme.js)? -> bump
 *     the "suite" entry (and the tools only if their behavior changed).
 *
 * The stamp() helper below automatically fills:
 *   - [data-tool-version]  -> "vX.Y.Z" of the current page
 *                            (or the tool named in the attribute value,
 *                             e.g. data-tool-version="compare.html")
 *   - [data-suite-version] -> "Suite vX.Y.Z"
 * ============================================================
 */

const TOOL_VERSIONS = {
    suite: { version: '1.2.0', date: '2026-10-15', name: 'Network Tools Suite' },

    'index.html':             { version: '1.2.0', date: '2026-10-15', name: 'Tools Hub' },
    'compare.html':           { version: '3.1.1', date: '2026-10-15', name: 'Network Pre/Post-Check Diff' },
    'bng_gw_pingtrace.html':  { version: '1.0.1', date: '2026-10-15', name: 'BNG GW Ping/Traceroute' },
    'mac_converter.html':     { version: '1.0.1', date: '2026-10-15', name: 'MAC Address Converter' },
    'mac_vender.html':        { version: '1.1.0', date: '2026-10-15', name: 'MAC Vendor Lookup' },
    'ping_result.html':       { version: '1.0.1', date: '2026-10-15', name: 'Ping Result Parser' },
    'portqueue.html':         { version: '1.0.1', date: '2026-10-15', name: 'Port Queue Check' },
    'script.html':            { version: '1.0.1', date: '2026-10-15', name: 'Script Generator' },
    'subnet_calculator.html': { version: '1.2.0', date: '2026-10-15', name: 'Subnet Calculator' },
    'subnet_converter.html':  { version: '1.0.1', date: '2026-10-15', name: 'Subnet Converter' },
    'text_filter.html':       { version: '1.0.1', date: '2026-10-15', name: 'Text Filter' },
    'wan.html':               { version: '1.0.1', date: '2026-10-15', name: 'VPN WAN Finder' },

    // Shared assets (informational - bumped when the shared file changes)
    'assets/styles/common.css': { version: '1.2.0', date: '2026-10-15' },
    'assets/styles/fonts.css':  { version: '1.0.0', date: '2026-10-15' },
    'assets/js/theme.js':       { version: '1.0.0', date: '2026-01-10' },
    'assets/js/ip-utils.js':    { version: '1.1.0', date: '2026-10-15' },
    'assets/js/diff.min.js':    { version: '5.2.0', date: '2026-10-15' }
};

(function () {
    function currentPageKey() {
        var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        return TOOL_VERSIONS[file] ? file : 'index.html';
    }

    function stamp() {
        var suite = TOOL_VERSIONS.suite.version;

        document.querySelectorAll('[data-tool-version]').forEach(function (el) {
            var key = (el.getAttribute('data-tool-version') || currentPageKey()).toLowerCase();
            var info = TOOL_VERSIONS[key];
            if (!info) return;
            el.textContent = 'v' + info.version;
            el.title = (info.name || key) + ' v' + info.version + ' \u2022 Suite v' + suite + ' \u2022 ' + info.date;
        });

        document.querySelectorAll('[data-suite-version]').forEach(function (el) {
            el.textContent = 'Suite v' + suite;
            el.title = TOOL_VERSIONS.suite.name + ' v' + suite + ' \u2022 ' + TOOL_VERSIONS.suite.date;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', stamp);
    } else {
        stamp();
    }
})();

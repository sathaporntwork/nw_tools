# Network Tools Suite

A professional, modern, and responsive suite of networking utilities designed for network engineers and system administrators. This project features a centralized architecture with a consistent UI/UX, dark/light mode support, and purely client-side execution for security and speed.

## 🚀 Features

*   **Centralized Architecture**: Shared CSS and JavaScript resources for consistent styling and behavior across all tools.
*   **Modern UI/UX**: clean, card-based interface with glassmorphism effects and smooth animations.
*   **Theme Support**: Built-in Dark and Light modes with automatic persistence.
*   **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
*   **Client-Side Only**: All processing happens in the browser. No data is sent to any server, ensuring privacy and security.

## 🛠️ Included Tools

1.  **MAC Address Converter**
    *   Convert MAC addresses between various formats (Cisco, Windows, Linux, etc.) in real-time.
    *   Supports bulk processing.

2.  **MAC Vendor Lookup**
    *   Identify device manufacturers from MAC addresses using an OUI database.

3.  **Subnet Calculator**
    *   Calculate IPv4/IPv6 subnet details, including network address, broadcast address, and host ranges.

4.  **Subnet Converter**
    *   Convert between Subnet Mask, CIDR notation, and Wildcard Masks.
    *   Supports bulk conversion.

5.  **VPN WAN Finder**
    *   Analyze router output to discover available WAN IP addresses.
    *   includes verification command generation.

6.  **Port Queue Check**
    *   Analyze and filter router configuration to check port queue status.

7.  **Text Filter**
    *   Filter text lines based on "Include" and "Exclude" keywords.
    *   Useful for parsing log files or configuration dumps.

8.  **Script Generator**
    *   Generate configuration scripts for network devices.

9.  **Configuration Compare**
    *   Compare two text configurations side-by-side with intelligent difference highlighting.
    *   Features advanced navigation (Previous/Next diff buttons with jump-to capability).
    *   Compact mode to show only differences while retaining context.
    *   Visual diff highlighting with line numbers and toast notifications.

10. **Ping Parser**
    *   Parse Windows/Linux ping results to extract IP and Loss %.
    *   Support mixed output formats.

11. **BNG GW Ping/Traceroute**
    *   Paste BNG device output to auto-detect the device node number and select matching odd/even gateway IP pools.
    *   Generates `ping` or `tracert` commands per matched pool.
    *   Supports GW IP filtering: All, Private IP (RFC1918 + CGNAT), or Public IP.
    *   Run Mode selector: Trace (default) or Ping.

## 📦 Project Structure

```text
tools/
├── assets/
│   ├── styles/
│   │   └── common.css       # Centralized styles (Theming, Components, Layout)
│   └── js/
│       ├── theme.js         # Theme management logic
│       └── ip-utils.js      # Core IP validation and conversion library
├── index.html               # Main Dashboard
├── mac_converter.html
├── mac_vender.html
├── subnet_calculator.html
├── subnet_converter.html
├── wan.html
├── text_filter.html
├── script.html
├── portqueue.html
├── compare.html
├── ping_result.html
└── bng_gw_pingtrace.html
```

## 🚀 Deployment

This project is designed to be hosted on any static web server (Apache, Nginx, IIS) or static site hosting service.

### GitHub Pages (Recommended)

1.  Push this repository to GitHub.
2.  Go to **Settings** > **Pages**.
3.  Select the **main** branch and **/(root)** folder.
4.  Click **Save**.

### Cloudflare Pages / Vercel / Netlify

Simply connect your GitHub repository and point the build directory to the root regardless of the platform.

## 💻 Tech Stack

*   **HTML5**: Semantic and accessible structure.
*   **CSS3**: Custom properties (Variables), Flexbox, Grid, and CSS Animations.
*   **JavaScript (ES6+)**: Modular logic for validation, conversion, and DOM manipulation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

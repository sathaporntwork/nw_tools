# Network Tools Suite

A professional, modern, and responsive suite of networking utilities designed for network engineers and system administrators1.0.1 Self-hosted fonts, offline-ready assets (glass via shared theme) | File | Version | Notes |
|---|---|---|
| `compare.html` | v3.2.0 | Multi-strategy diff engine: section splitting, hierarchical config blocks, key-based tables (ARP/MAC/route/BGP/OSPF/interface), noise masking, sanity dashboard, word wrap, filter-count pills |
| `subnet_calculator.html` | v1.3.0 | Liquid glass component styling; self-hosted fonts |
| `index.html` | v1.3.0 | Per-tool version chips on the hub; self-hosted fonts; Subnet Verify external card |
| `mac_vender.html` | v1.1.0 | Clearer offline/file:// guidance (start-server.bat); self-hosted fonts |
| `bng_gw_pingtrace.html` | v1.1.0 | Liquid glass component styling; self-hosted fonts |
| `mac_converter.html` | v1.1.0 | Liquid glass component styling; self-hosted fonts |
| `ping_result.html` | v1.1.0 | Liquid glass component styling; self-hosted fonts |
| `portqueue.html` | v1.1.0 | Liquid glass component styling; self-hosted fonts |
| `script.html` | v1.0.2 | Comfortable action-button padding; self-hosted fonts, offline-ready assets (glass via shared theme) |
| `subnet_converter.html` | v1.1.0 | Liquid glass component styling; self-hosted fonts |
| `text_filter.html` | v1.1.0 | Liquid glass component styling; self-hosted fonts |
| `wan.html` | v1.1.0 | Liquid glass component styling; self-hosted fonts |

Shared assets: `common.css` v1.3.0 (liquid glass design system) • `fonts.css` v1.0.0 • `theme.js` v1.0.0 • `ip-utils.js` v1.1.0 • vendored `diff.min.js` v5.2.0

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

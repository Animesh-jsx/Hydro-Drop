# Product Requirements Document (PRD): Hydra Drop Admin Panel

## 1. Introduction
The Hydra Drop Admin Panel is a premium, high-stakes operational tool designed for the management of the Hydra Drop e-commerce platform. It provides administrators with a comprehensive overview of key metrics, order management, customer data, product inventory, and customization requests. The design is optimized for power users, emphasizing data density, legibility, and professional polish, ensuring that complex datasets are easily scannable and actionable.

## 2. Design System & Aesthetics
The Admin Panel adheres strictly to the provided design guidelines, utilizing a "Productivity-First" palette. The theme is Corporate and Modern, prioritizing structural integrity. The primary color is a deep Emerald Green used for active states and brand markers, while Gold serves as a secondary color for premium accents. The surface colors consist of cool grays and whites to define layout groupings without causing visual fatigue. Status indicators use vibrant, high-contrast colors for immediate scanning, such as blue for processing, purple for shipped, green for delivered, and red for cancelled.

Typography is optimized for density and legibility. Hanken Grotesk provides a modern, geometric feel for headers, while Inter is the workhorse for UI controls and long-form data. JetBrains Mono is specifically used for tabular data, IDs, and financial figures to ensure perfect alignment. The layout follows a Fixed-Fluid hybrid model, featuring a fixed 260px dark emerald-charcoal sidebar and a fluid 12-column grid for the main content. Elevation is kept minimal, relying on 1px borders and subtle background tints for interactive states rather than heavy shadows. Components utilize soft geometry, with a 4px radius for buttons and inputs, and an 8px radius for cards.

## 3. Core Pages & Features

### 3.1. Dashboard Overview
The Dashboard serves as the central hub for high-level metrics and immediate operational alerts. It provides administrators with a quick snapshot of the business's health and areas requiring immediate attention.

| Component | Description |
| :--- | :--- |
| Key Metrics Cards | Displays Total Revenue, Orders Today, New Customers, and Avg Order Value. Includes a primary metric, a secondary trend indicator, and a subtle icon. |
| Sales Performance Chart | A simplified area chart (Sparkline) showing sales trends over Week, Month, or Year. |
| Quick Actions Panel | Provides easy access to frequent tasks such as Add Product, Check Inventory, and Create Campaign. |
| Recent Orders Table | A condensed view of the latest orders, showing Order ID, Customer, Status (color-coded badge), and Amount. |
| Inventory Alerts | Highlights products with low stock, showing the product image, name, remaining units (in red text), and a "Restock" action button. |

### 3.2. Order Management
The Order Management page provides a comprehensive view for tracking and processing customer orders. It is designed to handle high volumes of transactions efficiently. Administrators can search by ID or Customer, and use segmented controls to filter by status (All, Processing, Out for Delivery, Delivered). The interface includes actions for exporting data to CSV and creating new orders. The main table displays the Order ID, Date, Customer, Bottle Type, Variety, Status, Total, and Actions, utilizing JetBrains Mono for IDs and financial figures. Pagination controls are included for navigating through large datasets.

### 3.3. Customers Directory
The Customers Directory is a management interface for customer profiles and lifetime value analysis. Administrators can search by name or email and filter by Active or Inactive status. The page includes options to export the list, apply advanced filters, and add new customers. The primary table lists the Customer (with Avatar and Name), Contact Email, Orders Count, Lifetime Value (LTV), Last Order Date, Status, and available Actions. Similar to the orders table, JetBrains Mono is used for LTV and dates to ensure clean alignment.

### 3.4. Product Catalog
The Product Catalog interface allows for the management of active listings, inventory, and product details. Users can search the catalog and switch between tabs for All Products, Still Water, Sparkling, and Functional varieties. The view can be toggled between a Grid of cards and a List view. Bulk actions and a button to add new products are available at the top. In Grid view, product cards display an image with a category tag, the product name and price, a brief description, a stock indicator, and an edit icon.

### 3.5. Customization Requests
This page is a specialized queue for reviewing, providing feedback, and approving customer "Brand Your Own" submissions. The layout is split into two panels for efficient processing.

| Panel | Description |
| :--- | :--- |
| Queue Panel (Left) | A list of active requests. Each item shows the company name, date, product details, and current status (In Review, Awaiting Design, Approved). |
| Review Panel (Right) | A detailed view of the selected request. It includes a header with the Status badge, Request ID, and Company Name. |
| Design Assets | A visual preview of the submitted logo or design on the selected product. |
| Order Specifications | Details such as Product type, Application method (e.g., Laser Engrave), Base Color, and Quantity. |
| Admin Notes & Actions | A text area for adding notes or required revisions, along with buttons to "Request Revision" or "Approve for Print". |

### 3.6. Admin Login (New Implementation)
The Admin Login provides a secure entry point for administrators, separate from the consumer storefront. It features a centered login card on a clean, minimal background without the consumer Navbar or Footer. The form includes the Hydra Drop Admin Portal logo, Ghost style inputs for Email Address and Password (which thicken to Primary Emerald on focus), a "Remember me" checkbox, and a "Forgot password?" link. The primary action is a solid Primary Emerald "Sign In" button.

## 4. Technical Implementation Notes
The Admin Panel should be placed under a separate route group (e.g., `/admin/*`) that does not use the consumer `<Layout />` component, as it requires a different sidebar navigation structure and layout paradigm. New reusable components specific to the admin interface must be created, such as `AdminSidebar`, `AdminTable`, `StatusBadge`, and `DataCard`. The Tailwind configuration must be extended to include the specific design tokens from the design guidelines, ensuring the `sidebar-bg`, `emerald-surface`, and `status-*` colors are globally available.

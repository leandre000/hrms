# HR Pro - Modern HR Management System

A modern, responsive landing page for HR Pro, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional UI with purple theme
- **Responsive**: Mobile-first design that works on all devices
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **React Router**: Client-side routing for smooth navigation
- **Lucide Icons**: Beautiful, customizable icons
- **Vite**: Fast development server and build tool

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Animations**: Framer Motion (ready for use)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hrms-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Hero banner section
│   ├── FeaturesSection.tsx # Features grid
│   ├── TestimonialsSection.tsx # Customer reviews
│   ├── CTASection.tsx  # Call-to-action section
│   └── Footer.tsx      # Footer with links
├── pages/              # Page components
│   └── LandingPage.tsx # Main landing page
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`#8b5cf6` to `#6d28d9`)
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: White and light grays for contrast

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Primary (purple) and Secondary (outlined)
- **Cards**: Clean white cards with subtle shadows
- **Sections**: Consistent padding and spacing

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Sections

1. **Header**: Navigation with logo and CTA buttons
2. **Hero**: Main headline with dashboard mockup
3. **Features**: 6 key HR features with icons
4. **Testimonials**: Customer reviews with ratings
5. **CTA**: Final conversion section
6. **Footer**: Links, social media, and company info

## 🔧 Customization

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add it to `src/pages/LandingPage.tsx`
3. Style using Tailwind classes

### Modifying Colors
Update the color palette in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#f5f3ff',
    // ... other shades
  }
}
```

### Adding Animations
Use Framer Motion for animations:
```javascript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content here
</motion.div>
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@hrpro.com or create an issue in the repository.

---

Built with ❤️ for modern HR management

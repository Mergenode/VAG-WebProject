// src/components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-4 text-center text-v-gray">
          <p>&copy; {currentYear} VAG OTO PARÇA. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
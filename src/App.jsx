import React, { useState, useEffect } from 'react';

// Main App Component
function App() {
  // State to manage the current view: 'home' (gallery) or 'client-area'
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-inter">
      {/* Header with Navigation */}
      <header className="bg-black text-white p-6 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center" aria-label="Main Navigation">
          <h1 className="text-3xl font-bold text-white">JG Pixel</h1>
          <div className="space-x-6">
            <button
              onClick={() => setCurrentView('home')}
              aria-label="Show Portfolio Gallery"
              className={`text-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                currentView === 'home' ? 'text-white border-b-2 border-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setCurrentView('client-area')}
              aria-label="Show Client Area"
              className={`text-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                currentView === 'client-area' ? 'text-white border-b-2 border-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Client Area
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto p-8 py-12">
        {currentView === 'home' ? <Gallery /> : <ClientArea />}
      </main>

      {/* Footer */}
      <footer className="bg-black text-neutral-400 p-6 text-center shadow-inner mt-12">
        <p>&copy; {new Date().getFullYear()} JG Pixel. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Gallery Component: Displays the main portfolio
function Gallery() {
  // Sample images for the gallery. Replace these with your actual image URLs.
  // For a real application, you'd likely fetch these from a backend or a static asset folder.
  const images = [
    { id: 'p001', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+01', alt: 'Landscape Photo' },
    { id: 'p002', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+02', alt: 'Portrait Photo' },
    { id: 'p003', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+03', alt: 'Cityscape Photo' },
    { id: 'p004', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+04', alt: 'Nature Photo' },
    { id: 'p005', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+05', alt: 'Abstract Photo' },
    { id: 'p006', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+06', alt: 'Wildlife Photo' },
    { id: 'p007', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+07', alt: 'Street Photo' },
    { id: 'p008', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Photo+08', alt: 'Food Photo' },
  ];

  return (
    <section className="text-center">
      <h2 className="text-5xl font-extrabold mb-12 text-white">Our Portfolio</h2>
      <p className="text-lg text-neutral-300 mb-12 max-w-3xl mx-auto">
        Explore a selection of our finest work, showcasing diverse styles and captivating moments.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((image) => (
          <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-xl bg-neutral-800">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              // Fallback for image loading errors
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/000000/FFFFFF?text=Error`; }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xl font-semibold">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Client Area Component: Displays watermarked photos for selection
function ClientArea() {
  // Sample watermarked images. In a real app, you'd have actual watermarked versions.
  const watermarkedImages = [
    { id: 'w001', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Watermark+01', alt: 'Client Photo 1' },
    { id: 'w002', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Watermark+02', alt: 'Client Photo 2' },
    { id: 'w003', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Watermark+03', alt: 'Client Photo 3' },
    { id: 'w004', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Watermark+04', alt: 'Client Photo 4' },
    { id: 'w005', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Watermark+05', alt: 'Client Photo 5' },
    { id: 'w006', url: 'https://placehold.co/400x300/000000/FFFFFF?text=Watermark+06', alt: 'Client Photo 6' },
  ];

  // State to store selected photo IDs
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  // State to control the visibility of the WhatsApp modal
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  // State to hold the generated WhatsApp URL
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  // Function to handle photo selection
  const handleSelectPhoto = (photoId) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(photoId)
        ? prevSelected.filter((id) => id !== photoId) // Deselect if already selected
        : [...prevSelected, photoId] // Select if not selected
    );
  };

  // Function to handle the "Comprar" (Buy) button click
  const handleComprarClick = () => {
    if (selectedPhotos.length === 0) {
      // Show a message if no photos are selected
      alert("Please select at least one photo to proceed with your purchase.");
      return;
    }

    // Construct the message for WhatsApp
    const message = `Olá! Tenho interesse em comprar as seguintes fotos (IDs): ${selectedPhotos.join(', ')}. Por favor, entre em contato para finalizar a compra.`;
    // Replace 'YOUR_PHONE_NUMBER' with your actual WhatsApp number (e.g., 5511999998888)
    const phoneNumber = 'YOUR_PHONE_NUMBER'; // IMPORTANT: Replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    setWhatsAppUrl(url);
    setShowWhatsAppModal(true); // Show the modal instead of direct redirect
  };

  // Function to close the WhatsApp modal
  const closeWhatsAppModal = () => {
    setShowWhatsAppModal(false);
    setWhatsAppUrl('');
  };

  return (
    <section className="text-center">
      <h2 className="text-5xl font-extrabold mb-12 text-white">Client Area</h2>
      <p className="text-lg text-neutral-300 mb-12 max-w-3xl mx-auto">
        Here you can view your watermarked photos. Select the ones you wish to purchase and click "Comprar" to contact us via WhatsApp.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {watermarkedImages.map((image) => (
          <div
            key={image.id}
            className={`relative group overflow-hidden rounded-lg shadow-xl bg-neutral-800 cursor-pointer
              ${selectedPhotos.includes(image.id) ? 'ring-4 ring-white' : ''}`}
            onClick={() => handleSelectPhoto(image.id)}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              // Fallback for image loading errors
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/000000/FFFFFF?text=Error`; }}
            />
            {/* Simulated Watermark Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold opacity-100">
              <span className="transform rotate-[-25deg] opacity-70">WATERMARK</span>
            </div>
            {/* Selection Overlay */}
            <div className="absolute top-2 right-2">
              <input
                type="checkbox"
                checked={selectedPhotos.includes(image.id)}
                onChange={() => handleSelectPhoto(image.id)} // Allow toggling via checkbox
                className="form-checkbox h-6 w-6 text-white bg-neutral-700 border-neutral-500 rounded focus:ring-2 focus:ring-white"
                style={{ accentColor: 'white' }} // Style the checkbox for black/white theme
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleComprarClick}
        className="px-8 py-4 bg-white text-black text-xl font-bold rounded-full shadow-lg hover:bg-neutral-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75"
      >
        Comprar ({selectedPhotos.length})
      </button>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <Modal onClose={closeWhatsAppModal}>
          <div className="bg-neutral-800 rounded-lg shadow-2xl p-8 max-w-md w-full text-center relative" tabIndex={0}>
            <button
              onClick={closeWhatsAppModal}
              aria-label="Close WhatsApp Modal"
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              &times;
            </button>
            <h3 id="whatsapp-modal-title" className="text-3xl font-bold text-white mb-6">Contact via WhatsApp</h3>
            <p className="text-lg text-neutral-300 mb-8">
              You've selected {selectedPhotos.length} photo(s). Click the button below to open WhatsApp with your selection.
            </p>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeWhatsAppModal}
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
              aria-label="Open WhatsApp with selected photos"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2C7.38 2 3.5 5.88 3.5 10.54c0 1.95.63 3.82 1.83 5.38L3 21.04l5.24-1.38c1.47.8 3.16 1.25 4.3 1.25 4.66 0 8.54-3.88 8.54-8.54S16.7 2 12.04 2zm4.8 14.88c-.14.23-.8.5-1.16.58-.36.08-.79.13-1.22.04-.43-.08-1.01-.35-1.78-.87-.77-.52-1.84-1.7-2.68-2.94-.84-1.24-1.07-1.79-.8-2.11.27-.32.6-.4.8-.44.2-.04.43-.1.66-.1.23 0 .4-.06.56-.06.16 0 .28-.08.43-.04.15.04.8.96.86 1.03.06.07.1.16.02.3-.08.15-.5.48-.68.65-.18.17-.37.36-.17.7.2.34.8.98 1.45 1.5.65.52 1.2 1.04 1.58 1.2.38.16.6.24.8.3.2.06.38.04.5.02.12-.02.36-.15.7-.3.34-.15.6-.26.8-.26.2 0 .4.08.56.23.16.15.25.4.16.58z"/>
              </svg>
              Open WhatsApp
            </a>
          </div>
        </Modal>
      )}
    </section>
  );
}

// Modal component for accessibility and focus trap
function Modal({ children, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
      // Trap focus inside modal
      if (e.key === 'Tab') {
        const focusableEls = document.querySelectorAll('.modal [tabindex]:not([tabindex="-1"])');
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        } else if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 modal" role="dialog" aria-modal="true">
      {children}
    </div>
  );
}

export default App;

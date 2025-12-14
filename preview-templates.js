/* global React, CMS */

const HeroPreview = ({ entry, widgetFor, widgetsFor }) => {
  const data = entry.getIn(['data']).toJS();
  // Manejo seguro de la imagen si es un objeto o string
  const bgImage = data.hero && data.hero.bgImage ? data.hero.bgImage : '';
  const title = data.hero && data.hero.title ? data.hero.title : 'Título del Hero';
  const subtitle = data.hero && data.hero.subtitle ? data.hero.subtitle : 'Subtítulo del Hero';

  return React.createElement('div', {
    style: {
      position: 'relative',
      height: '500px',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }
  },
    React.createElement('div', { style: { backgroundColor: 'rgba(0,0,0,0.4)', padding: '40px', borderRadius: '10px' } },
      React.createElement('h1', { style: { fontSize: '48px', marginBottom: '20px', margin: 0 } }, title),
      React.createElement('p', { style: { fontSize: '24px', marginTop: '10px' } }, subtitle)
    )
  );
};

// Registrar el preview para la colección específica (ajusta 'content' si tu colección se llama diferente)
CMS.registerPreviewTemplate('content', HeroPreview);
CMS.registerPreviewTemplate('data', HeroPreview);
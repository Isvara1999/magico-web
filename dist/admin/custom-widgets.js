/**
 * WIDGET: ImageWithValidationWidget
 * Valida dimensiones y tamaño del archivo antes de subirlo.
 */
const ImageWithValidationWidget = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null,
      dimensions: null,
      imageUrl: null
    };
  }

  validateImage = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const recommendedWidth = 1200;
    const recommendedHeight = 800;

    if (file.size > maxSize) {
      this.setState({ error: 'El archivo excede 5MB' });
      return false;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      this.setState({ 
        dimensions: { width: img.width, height: img.height },
        imageUrl: url,
        error: null
      });
      
      if (img.width < recommendedWidth || img.height < recommendedHeight) {
        this.setState({ 
          error: `⚠️ Resolución baja: ${img.width}x${img.height}. Recomendado: ${recommendedWidth}x${recommendedHeight}`
        });
      }
    };
    
    img.src = url;
    return true;
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && this.validateImage(file)) {
      this.props.onChange(file);
    }
  };

  render() {
    const { value } = this.props;
    const { error, dimensions, imageUrl } = this.state;
    const displayUrl = imageUrl || (typeof value === 'string' ? value : null);

    return React.createElement('div', { style: { marginBottom: '20px', border: '1px solid #dfdfdf', padding: '15px', borderRadius: '5px' } },
      React.createElement('input', { 
        type: 'file', 
        accept: 'image/*', 
        onChange: this.handleFileChange 
      }),
      error && React.createElement('p', { style: { color: '#e67e22', fontSize: '14px', marginTop: '8px' } }, error),
      dimensions && React.createElement('p', { style: { color: '#27ae60', fontSize: '12px' } }, 
        `✓ Dimensiones: ${dimensions.width}x${dimensions.height}px`
      ),
      displayUrl && React.createElement('img', { 
        src: displayUrl, 
        alt: 'Preview',
        style: { maxWidth: '300px', marginTop: '10px', borderRadius: '8px', display: 'block' }
      })
    );
  }
};

/**
 * WIDGET: EnhancedImageEditorWidget
 * Editor avanzado con CropperJS (Crop, Rotate, Zoom, Flip).
 * Requiere que CropperJS esté cargado globalmente o disponible.
 */
const EnhancedImageEditorWidget = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropper: null,
      imageSrc: null
    };
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.value) {
      // Si ya existe una imagen, inicializar el cropper
      setTimeout(() => {
        if (this.imgRef.current && !this.state.cropper) {
          const cropper = new Cropper(this.imgRef.current, {
            viewMode: 1,
            autoCropArea: 1,
          });
          this.setState({ cropper });
        }
      }, 200);
    }
  }

  componentWillUnmount() {
    if (this.state.cropper) {
      this.state.cropper.destroy();
    }
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.setState({ imageSrc: url }, () => {
        if (this.state.cropper) this.state.cropper.destroy();
        // Inicializar Cropper después de que la imagen se renderice
        setTimeout(() => {
            const cropper = new Cropper(this.imgRef.current, {
                viewMode: 1,
                autoCropArea: 1,
            });
            this.setState({ cropper });
        }, 100);
      });
    }
  };

  handleRotate = (degrees) => {
    if (this.state.cropper) this.state.cropper.rotate(degrees);
  };

  handleFlip = (direction) => {
    if (this.state.cropper) {
      if (direction === 'horizontal') {
        this.state.cropper.scaleX(-this.state.cropper.getData().scaleX || -1);
      } else {
        this.state.cropper.scaleY(-this.state.cropper.getData().scaleY || -1);
      }
    }
  };

  handleZoom = (ratio) => {
    if (this.state.cropper) this.state.cropper.zoom(ratio);
  };

  handleReset = () => {
    if (this.state.cropper) this.state.cropper.reset();
  };

  handleAspectRatio = (ratio) => {
    if (this.state.cropper) this.state.cropper.setAspectRatio(ratio);
  };

  handleCropWithQuality = (quality = 0.9) => {
    if (this.state.cropper) {
      const canvas = this.state.cropper.getCroppedCanvas({
        maxWidth: 2000,
        maxHeight: 2000,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        this.props.onChange(file);
        alert('Imagen recortada guardada temporalmente. Recuerda publicar los cambios.');
      }, 'image/jpeg', quality);
    }
  };

  render() {
    const buttonStyle = {
      padding: '6px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontSize: '13px',
      transition: 'all 0.2s'
    };

    const { value } = this.props;
    // Usar value si existe (URL) o imageSrc del estado local
    const src = this.state.imageSrc || (typeof value === 'string' ? value : null);

    return React.createElement('div', { style: { padding: '10px', border: '1px solid #ccc', borderRadius: '8px' } },
      React.createElement('input', { type: 'file', accept: 'image/*', onChange: this.handleFileChange, style: { marginBottom: '10px' } }),
      
      src && React.createElement('div', null,
        React.createElement('div', { style: { maxHeight: '500px', overflow: 'hidden', marginBottom: '15px' } },
            React.createElement('img', { 
            ref: this.imgRef, 
            src: src,
            alt: 'Edit',
            style: { maxWidth: '100%', display: 'block' }
            })
        ),
        
        React.createElement('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' } },
          React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(16/9), style: buttonStyle }, '16:9'),
          React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(4/3), style: buttonStyle }, '4:3'),
          React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(1), style: buttonStyle }, '1:1'),
          React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(NaN), style: buttonStyle }, 'Libre'),
          
          React.createElement('button', { type: 'button', onClick: () => this.handleRotate(-90), style: buttonStyle }, '↶ 90°'),
          React.createElement('button', { type: 'button', onClick: () => this.handleRotate(90), style: buttonStyle }, '↷ 90°'),
          
          React.createElement('button', { type: 'button', onClick: () => this.handleFlip('horizontal'), style: buttonStyle }, '⇄ H'),
          
          React.createElement('button', { type: 'button', onClick: () => this.handleZoom(0.1), style: buttonStyle }, '➕'),
          React.createElement('button', { type: 'button', onClick: () => this.handleZoom(-0.1), style: buttonStyle }, '➖'),
          
          React.createElement('button', { type: 'button', onClick: this.handleReset, style: { ...buttonStyle, backgroundColor: '#e74c3c', color: 'white' } }, '↺ Reset'),
          React.createElement('button', { type: 'button', onClick: () => this.handleCropWithQuality(0.9), style: { ...buttonStyle, backgroundColor: '#27ae60', color: 'white', fontWeight: 'bold' } }, '✓ Guardar Recorte')
        )
      )
    );
  }
};

/**
 * WIDGET: SEOWidget
 * Campos agrupados para SEO (Título, Descripción, Keywords).
 */
const SEOWidget = ({ value, onChange }) => {
  const [seo, setSEO] = React.useState(value || { title: '', description: '', keywords: '' });

  const handleChange = (field, val) => {
    const newSEO = { ...seo, [field]: val };
    setSEO(newSEO);
    onChange(newSEO);
  };

  return React.createElement('div', { style: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' } },
    React.createElement('h3', { style: { marginTop: 0, marginBottom: '15px', fontSize: '16px' } }, 'Optimización para Buscadores (SEO)'),
    
    React.createElement('div', { style: { marginBottom: '15px' } },
      React.createElement('label', { style: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '12px' } }, 'Título SEO'),
      React.createElement('input', { type: 'text', value: seo.title || '', onChange: (e) => handleChange('title', e.target.value), placeholder: 'Título optimizado (60 caracteres)', style: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }, maxLength: 60 }),
      React.createElement('small', { style: { color: '#666' } }, `${(seo.title || '').length}/60`)
    ),

    React.createElement('div', { style: { marginBottom: '15px' } },
      React.createElement('label', { style: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '12px' } }, 'Meta Descripción'),
      React.createElement('textarea', { value: seo.description || '', onChange: (e) => handleChange('description', e.target.value), placeholder: 'Descripción breve (160 caracteres)', style: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }, maxLength: 160 }),
      React.createElement('small', { style: { color: '#666' } }, `${(seo.description || '').length}/160`)
    ),

    React.createElement('div', null,
      React.createElement('label', { style: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '12px' } }, 'Keywords'),
      React.createElement('input', { type: 'text', value: seo.keywords || '', onChange: (e) => handleChange('keywords', e.target.value), placeholder: 'palabra1, palabra2, palabra3', style: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' } })
    )
  );
};

// Registrar los widgets
CMS.registerWidget('image-validated', ImageWithValidationWidget);
CMS.registerWidget('image-editor-advanced', EnhancedImageEditorWidget);
CMS.registerWidget('seo', SEOWidget);

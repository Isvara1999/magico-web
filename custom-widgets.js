/* global React, CMS, Cropper */

// =====================================================================
// 1. WIDGET DE IMAGEN CON VALIDACIÓN (ImageWithValidationWidget)
// =====================================================================

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

    return React.createElement('div', { style: { marginBottom: '20px', border: '2px dashed #ddd', padding: '20px', borderRadius: '8px' } },
      React.createElement('input', { 
        type: 'file', 
        accept: 'image/*', 
        onChange: this.handleFileChange 
      }),
      error && React.createElement('p', { style: { color: '#e67e22', fontSize: '14px', marginTop: '8px', fontWeight: 'bold' } }, error),
      dimensions && React.createElement('p', { style: { color: '#27ae60', fontSize: '12px' } }, 
        `✓ Dimensiones: ${dimensions.width}x${dimensions.height}px`
      ),
      displayUrl && React.createElement('img', { 
        src: displayUrl, 
        alt: 'Preview',
        style: { maxWidth: '300px', marginTop: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }
      })
    );
  }
};

CMS.registerWidget('image-validated', ImageWithValidationWidget);


// =====================================================================
// 2. WIDGET EDITOR DE IMÁGENES AVANZADO (EnhancedImageEditorWidget)
// =====================================================================

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
    // Si ya hay un valor (URL), lo cargamos
    if (this.props.value) {
      const src = typeof this.props.value === 'string' ? this.props.value : URL.createObjectURL(this.props.value);
      this.setState({ imageSrc: src }, () => this.initCropper());
    }
  }

  componentWillUnmount() {
    if (this.state.cropper) {
      this.state.cropper.destroy();
    }
  }

  initCropper = () => {
    if (this.imgRef.current && !this.state.cropper) {
      const cropper = new Cropper(this.imgRef.current, {
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
      });
      this.setState({ cropper });
    }
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.setState({ imageSrc: url }, () => {
        if (this.state.cropper) {
          this.state.cropper.replace(url);
        } else {
          this.initCropper();
        }
      });
      // Notificamos al CMS del archivo original por si no recortan
      this.props.onChange(file);
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
        alert('✓ Recorte guardado temporalmente. Recuerda publicar los cambios.');
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

    return React.createElement('div', { style: { padding: '10px', border: '1px solid #eee', borderRadius: '8px' } },
      React.createElement('input', { type: 'file', accept: 'image/*', onChange: this.handleFileChange, style: { marginBottom: '10px' } }),
      
      this.state.imageSrc && React.createElement('div', null,
        React.createElement('div', { style: { height: '400px', marginBottom: '10px', backgroundColor: '#f0f0f0' } },
          React.createElement('img', { 
            ref: this.imgRef, 
            src: this.state.imageSrc,
            alt: 'Edit',
            style: { maxWidth: '100%', maxHeight: '100%' }
          })
        ),
        
        React.createElement('div', { style: { marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' } },
          React.createElement('div', { style: { display: 'flex', gap: '5px' } },
            React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(16/9), style: buttonStyle }, '16:9'),
            React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(4/3), style: buttonStyle }, '4:3'),
            React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(1), style: buttonStyle }, '1:1'),
            React.createElement('button', { type: 'button', onClick: () => this.handleAspectRatio(NaN), style: buttonStyle }, 'Libre')
          ),
          React.createElement('div', { style: { display: 'flex', gap: '5px' } },
            React.createElement('button', { type: 'button', onClick: () => this.handleRotate(-90), style: buttonStyle }, '↶ 90°'),
            React.createElement('button', { type: 'button', onClick: () => this.handleRotate(90), style: buttonStyle }, '↷ 90°')
          ),
          React.createElement('div', { style: { display: 'flex', gap: '5px' } },
            React.createElement('button', { type: 'button', onClick: () => this.handleFlip('horizontal'), style: buttonStyle }, '⇄ H'),
            React.createElement('button', { type: 'button', onClick: () => this.handleFlip('vertical'), style: buttonStyle }, '⇅ V')
          ),
          React.createElement('div', { style: { display: 'flex', gap: '5px' } },
            React.createElement('button', { type: 'button', onClick: () => this.handleZoom(0.1), style: buttonStyle }, '➕'),
            React.createElement('button', { type: 'button', onClick: () => this.handleZoom(-0.1), style: buttonStyle }, '➖')
          ),
          React.createElement('button', { type: 'button', onClick: this.handleReset, style: { ...buttonStyle, backgroundColor: '#e74c3c', color: 'white' } }, '↺ Reset'),
          React.createElement('button', { type: 'button', onClick: () => this.handleCropWithQuality(0.9), style: { ...buttonStyle, backgroundColor: '#27ae60', color: 'white', fontWeight: 'bold' } }, '✓ Guardar Recorte')
        )
      )
    );
  }
};

CMS.registerWidget('image-editor-advanced', EnhancedImageEditorWidget);


// =====================================================================
// 3. WIDGET SEO (SEOWidget)
// =====================================================================

const SEOWidget = ({ value, onChange }) => {
  const [seo, setSEO] = React.useState(value || { title: '', description: '', keywords: '' });

  const handleChange = (field, val) => {
    const newSEO = { ...seo, [field]: val };
    setSEO(newSEO);
    onChange(newSEO);
  };

  return React.createElement('div', { style: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' } },
    React.createElement('h4', { style: { marginTop: 0, marginBottom: '15px', color: '#333' } }, '🔍 Optimización para Buscadores (SEO)'),
    
    React.createElement('div', { style: { marginBottom: '15px' } },
      React.createElement('label', { style: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '12px', textTransform: 'uppercase' } }, 'Título SEO'),
      React.createElement('input', {
        type: 'text',
        value: seo.title,
        onChange: (e) => handleChange('title', e.target.value),
        placeholder: 'Título optimizado para Google (máx 60 caracteres)',
        style: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' },
        maxLength: 60
      }),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '4px' } },
        React.createElement('small', { style: { color: seo.title.length > 50 ? '#e67e22' : '#666' } }, `${seo.title.length}/60 caracteres`),
        React.createElement('small', { style: { color: '#999' } }, 'Aparecerá en la pestaña del navegador')
      )
    ),

    React.createElement('div', { style: { marginBottom: '15px' } },
      React.createElement('label', { style: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '12px', textTransform: 'uppercase' } }, 'Meta Descripción'),
      React.createElement('textarea', {
        value: seo.description,
        onChange: (e) => handleChange('description', e.target.value),
        placeholder: 'Resumen atractivo que invita a hacer clic (máx 160 caracteres)',
        style: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px', fontFamily: 'inherit' },
        maxLength: 160
      }),
      React.createElement('small', { style: { color: seo.description.length > 150 ? '#e67e22' : '#666' } }, `${seo.description.length}/160 caracteres`)
    ),

    React.createElement('div', null,
      React.createElement('label', { style: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '12px', textTransform: 'uppercase' } }, 'Keywords (Palabras Clave)'),
      React.createElement('input', {
        type: 'text',
        value: seo.keywords,
        onChange: (e) => handleChange('keywords', e.target.value),
        placeholder: 'retiro, yoga, naturaleza, meditación (separadas por comas)',
        style: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }
      })
    )
  );
};

CMS.registerWidget('seo', SEOWidget);
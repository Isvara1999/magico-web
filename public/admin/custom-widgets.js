// public/admin/custom-widgets.js
// Assuming React and Cropper are available. Cropper needs to be loaded.

const ImageEditorWidget = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cropper: null };
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    if (this.imgRef.current && this.props.value && !this.state.cropper) {
      const newCropper = new Cropper(this.imgRef.current, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        responsive: true,
        restore: false,
        checkCrossOrigin: false,
        checkOrientation: false,
        modal: true,
        guides: true,
        center: true,
        highlight: false,
        background: false,
        autoCrop: true,
        autoCropArea: 0.8,
        movable: true,
        rotatable: true,
        scalable: true,
        zoomable: true,
        zoomOnTouch: true,
        zoomOnWheel: true,
        wheelZoomRatio: 0.1,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: true,
      });
      this.setState({ cropper: newCropper });
    }
  }

  componentWillUnmount() {
    if (this.state.cropper) this.state.cropper.destroy();
  }

  handleCrop = () => {
    if (this.state.cropper) {
      const canvas = this.state.cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        const file = new File([blob], 'cropped-image.png', { type: 'image/png' });
        this.props.onChange(file);
      });
    }
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.props.onChange(file);
    }
  };

  render() {
    return React.createElement('div', null,
      React.createElement('input', { type: 'file', accept: 'image/*', onChange: this.handleFileChange, ...this.props }),
      this.props.value && React.createElement('div', null,
        React.createElement('img', { ref: this.imgRef, src: typeof this.props.value === 'string' ? this.props.value : URL.createObjectURL(this.props.value), alt: 'Edit' }),
        React.createElement('button', { type: 'button', onClick: this.handleCrop }, 'Crop & Save')
      )
    );
  }
};

CMS.registerWidget('image-editor', ImageEditorWidget);
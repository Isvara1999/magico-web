// public/admin/custom-widgets.js
// Assuming React and Cropper are available. Cropper needs to be loaded.

const ImageEditorWidget = ({ value, onChange, ...props }) => {
  const [cropper, setCropper] = React.useState(null);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    if (imgRef.current && value && !cropper) {
      const newCropper = new Cropper(imgRef.current, {
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
      setCropper(newCropper);
    }
    return () => {
      if (cropper) cropper.destroy();
    };
  }, [value, cropper]);

  const handleCrop = () => {
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        const file = new File([blob], 'cropped-image.png', { type: 'image/png' });
        onChange(file);
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return React.createElement('div', null,
    React.createElement('input', { type: 'file', accept: 'image/*', onChange: handleFileChange, ...props }),
    value && React.createElement('div', null,
      React.createElement('img', { ref: imgRef, src: typeof value === 'string' ? value : URL.createObjectURL(value), alt: 'Edit' }),
      React.createElement('button', { type: 'button', onClick: handleCrop }, 'Crop & Save')
    )
  );
};

CMS.registerWidget('image-editor', ImageEditorWidget);
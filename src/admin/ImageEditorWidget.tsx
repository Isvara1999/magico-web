/// <reference path="../../global.d.ts" />
import React, { useRef, useEffect, useState } from 'react'; // Agrega useState
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import siteContent from '../../data.json';
import { SiteContent } from '../../types'; // Agrega import

const typedSiteContent: SiteContent = siteContent; // Cast para tipos

interface ImageEditorWidgetProps {
  value: string | File;
  onChange: (value: File | string) => void;
  [key: string]: any;
}

const ImageEditorWidget: React.FC<ImageEditorWidgetProps> = ({ value, onChange, ...props }): JSX.Element => { // Cambia a JSX.Element
  const imgRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false); // Nuevo estado para carga
  const [error, setError] = useState<string | null>(null); // Nuevo estado para errores

  useEffect(() => {
    setError(null); // Resetea error en cada cambio
    if (!imgRef.current || !value || (typeof value === 'string' && !value.trim()) || !(value instanceof File || typeof value === 'string')) {
      setLoading(false);
      return; // Validación mejorada: rechaza si value no es válido
    }
    setLoading(true);
    let url: string | null = null;
    // Revoca el URL anterior si existe
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    // Crea nuevo URL solo si value es File
    if (value instanceof File) {
      url = URL.createObjectURL(value);
      objectUrlRef.current = url;
    } else {
      url = value as string;
    }
    imgRef.current.src = url;
    // Agrega listener de carga y error
    const imgElement = imgRef.current;
    const handleLoad = () => {
      setLoading(false);
      cropperRef.current = new Cropper(imgElement, {
        // @ts-ignore
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
    };
    const handleError = () => {
      setLoading(false);
      setError('Error loading image. Please try another file.');
      console.error('Error loading image');
    };
    imgElement.addEventListener('load', handleLoad);
    imgElement.addEventListener('error', handleError);
    return () => {
      if (cropperRef.current) cropperRef.current.destroy();
      // Revoca el URL al desmontar o cambiar
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      imgElement.removeEventListener('load', handleLoad);
      imgElement.removeEventListener('error', handleError);
    };
  }, [value]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCropperCanvas();
      if (canvas) { // Verificación adicional
        (canvas as any).toBlob((blob) => {
          if (blob) {
            const originalFile = value instanceof File ? value : null;
            const fileName = originalFile ? originalFile.name.replace(/\.[^/.]+$/, '') : 'cropped-image'; // Preserva nombre base
            const fileType = originalFile ? originalFile.type : 'image/png'; // Preserva tipo original
            const file = new File([blob], `${fileName}-cropped.${fileType.split('/')[1]}`, { type: fileType });
            onChange(file); // Devuelve File para que Decap lo suba
          }
        });
      } else {
        setError('Failed to crop image. Please try again.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) { // Validación de tipo
      onChange(file);
    } else {
      setError('Please select a valid image file.');
    }
  };

  const { onChange: _, value: __, ...inputProps } = props;
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} {...inputProps} />
      {loading && <p>Loading image...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {value && !loading && !error && ( // Simplifica: muestra si value existe y no hay issues
        <>
          <img ref={imgRef} alt="Edit" />
          <button type="button" onClick={handleCrop} disabled={!cropperRef.current}>Crop & Save</button>
        </>
      )}
    </div>
  );
};

export default ImageEditorWidget;
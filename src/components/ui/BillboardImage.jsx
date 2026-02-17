import React, { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80';

const BillboardImage = ({ src, alt, className, style }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setImgSrc(FALLBACK_IMAGE);
            setHasError(true);
        }
    };

    return (
        <img
            src={imgSrc || FALLBACK_IMAGE}
            alt={alt || "Billboard"}
            className={className}
            style={{
                ...style,
                backgroundColor: '#f1f5f9',
                objectFit: 'cover'
            }}
            onError={handleError}
        />
    );
};

export default BillboardImage;

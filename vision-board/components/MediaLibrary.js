function MediaLibrary({ canvas, onClose }) {
    const mediaResources = {
        animations: [
            { id: 'tree-02', type: 'lottie', url: 'https://assets-v2.lottiefiles.com/a/5378db3c-1161-11ee-b4fa-23fb460c063d/kLltQ3m3ha.gif', label: 'Tree 02' },
            { id: 'tree-01', type: 'lottie', url: 'https://assets-v2.lottiefiles.com/a/fdf5bfe0-1183-11ee-a764-d31f7db82386/YRsjsyFFlZ.gif', label: 'Tree 01' },
            { id: 'basketball', type: 'lottie', url: 'https://assets-v2.lottiefiles.com/a/2d25fd12-1165-11ee-a454-ebc40bd79c26/CsYkokajEC.gif', label: 'Basketball' },
            { id: 'man-walking', type: 'lottie', url: 'https://assets-v2.lottiefiles.com/a/004d8552-fea5-11ee-a41e-3ffb2b3d58c0/jzw0sy2a15.gif', label: 'Man Walking' },
            { id: 'cheer', type: 'lottie', url: 'https://cdnl.iconscout.com/lottie/premium/preview/boy-and-girl-are-dancing-animation-download-in-lottie-json-gif-static-svg-file-formats--partners-couple-dance-wedding-spouse-happiness-pack-entertainment-animations-9516548.png', label: 'Cheer' }
        ],
        icons: [
            { id: 'coffee-01', url: 'https://cdn-icons-png.flaticon.com/512/8867/8867510.png', label: 'Coffee 01' },
            { id: 'sandwich-01', url: 'https://cdn-icons-png.flaticon.com/512/8867/8867497.png', label: 'Sandwich 01' },
            { id: 'food-01', url: 'https://cdn-icons-png.flaticon.com/512/9434/9434401.png', label: 'Food 01' },
            { id: 'fighting-02', url: 'https://cdn-icons-png.flaticon.com/512/8408/8408246.png', label: 'Fighting 02' },
            { id: 'fighting-01', url: 'https://cdn-icons-png.flaticon.com/512/8408/8408278.png', label: 'Fighting 01' },
            { id: 'candy-03', url: 'https://cdn-icons-png.flaticon.com/512/6347/6347610.png', label: 'Candy 03' },
            { id: 'candy-02', url: 'https://cdn-icons-png.flaticon.com/512/7457/7457401.png', label: 'Candy 02' },
            { id: 'candy-01', url: 'https://cdn-icons-png.flaticon.com/512/6347/6347547.png', label: 'Candy 01' },
            { id: 'star-03', url: 'https://cdn-icons-png.flaticon.com/512/6381/6381546.png', label: 'Star 03' },
            { id: 'star-02', url: 'https://cdn-icons-png.flaticon.com/256/7649/7649353.png', label: 'Star 02' },
            { id: 'star-01', url: 'https://cdn-icons-png.flaticon.com/256/6381/6381582.png', label: 'Star 01' },
            { id: 'flower-03', url: 'https://cdn-icons-png.flaticon.com/256/7039/7039043.png', label: 'Flower 03' },
            { id: 'flower-02', url: 'https://cdn-icons-png.flaticon.com/512/6376/6376085.png', label: 'Flower 02' },
            { id: 'flower-01', url: 'https://cdn-icons-png.flaticon.com/512/6376/6376215.png', label: 'Flower 01' }
        ]
    };

    const addMediaToCanvas = (media) => {
        try {
            if (media.type === 'lottie') {
                // For GIF animations
                fabric.Image.fromURL(media.url, (img) => {
                    img.set({
                        left: 100,
                        top: 100,
                        originX: 'center',
                        originY: 'center',
                        crossOrigin: 'anonymous' // Enable cross-origin loading
                    });

                    // Scale the image while maintaining aspect ratio
                    if (img.width > img.height) {
                        img.scaleToWidth(200);
                    } else {
                        img.scaleToHeight(200);
                    }

                    // Create a wrapper element for the GIF
                    const gifWrapper = document.createElement('div');
                    gifWrapper.style.position = 'absolute';
                    gifWrapper.style.pointerEvents = 'none';
                    document.body.appendChild(gifWrapper);

                    // Create an img element for the animated GIF
                    const gifImg = document.createElement('img');
                    gifImg.src = media.url;
                    gifImg.style.width = '100%';
                    gifImg.style.height = '100%';
                    gifImg.style.position = 'absolute';
                    gifImg.crossOrigin = 'anonymous';
                    gifWrapper.appendChild(gifImg);

                    // Create a custom fabric object that will update the GIF position
                    const customGifObject = new fabric.Image(img.getElement(), {
                        left: 100,
                        top: 100,
                        width: img.width,
                        height: img.height,
                        scaleX: img.scaleX,
                        scaleY: img.scaleY
                    });

                    // Update GIF wrapper position when the object moves
                    const updateGifPosition = () => {
                        const zoom = canvas.getZoom();
                        const point = customGifObject.getCenterPoint();
                        const offset = canvas.calcOffset();
                        
                        gifWrapper.style.left = `${point.x * zoom + offset.left - (customGifObject.width * customGifObject.scaleX * zoom) / 2}px`;
                        gifWrapper.style.top = `${point.y * zoom + offset.top - (customGifObject.height * customGifObject.scaleY * zoom) / 2}px`;
                        gifWrapper.style.width = `${customGifObject.width * customGifObject.scaleX * zoom}px`;
                        gifWrapper.style.height = `${customGifObject.height * customGifObject.scaleY * zoom}px`;
                        gifWrapper.style.transform = `rotate(${customGifObject.angle}deg)`;
                    };

                    // Add event listeners for object updates
                    customGifObject.on('moving', updateGifPosition);
                    customGifObject.on('scaling', updateGifPosition);
                    customGifObject.on('rotating', updateGifPosition);
                    canvas.on('zoom:change', updateGifPosition);

                    // Handle object removal
                    customGifObject.on('removed', () => {
                        gifWrapper.remove();
                    });

                    canvas.add(customGifObject);
                    canvas.renderAll();
                    updateGifPosition();
                });
            } else {
                // For static images
                fabric.Image.fromURL(media.url, (img) => {
                    img.set({
                        left: 100,
                        top: 100,
                        originX: 'center',
                        originY: 'center'
                    });
                    
                    if (img.width > img.height) {
                        img.scaleToWidth(100);
                    } else {
                        img.scaleToHeight(100);
                    }

                    canvas.add(img);
                    canvas.renderAll();
                });
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="media-library" data-name="media-library">
            <div className="mb-4" data-name="animations">
                <h3 className="text-sm font-semibold mb-2">Animations</h3>
                <div className="grid grid-cols-3 gap-2">
                    {mediaResources.animations.map(animation => (
                        <button
                            key={animation.id}
                            className="media-item"
                            onClick={() => addMediaToCanvas(animation)}
                            data-name={`animation-${animation.id}`}
                        >
                            <img 
                                src={animation.url} 
                                alt={animation.label}
                                className="w-full h-24 object-cover rounded"
                            />
                            <span className="text-xs mt-1">{animation.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4" data-name="icons">
                <h3 className="text-sm font-semibold mb-2">Icons</h3>
                <div className="grid grid-cols-4 gap-2">
                    {mediaResources.icons.map(icon => (
                        <button
                            key={icon.id}
                            className="media-item"
                            onClick={() => addMediaToCanvas(icon)}
                            data-name={`icon-${icon.id}`}
                        >
                            <img 
                                src={icon.url} 
                                alt={icon.label}
                                className="w-full h-16 object-contain rounded"
                            />
                            <span className="text-xs mt-1">{icon.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <button
                className="w-full py-2 text-center text-gray-600 hover:text-gray-800"
                onClick={onClose}
                data-name="close-media-library"
            >
                <i className="fas fa-times mr-2"></i>
                Close
            </button>
        </div>
    );
}
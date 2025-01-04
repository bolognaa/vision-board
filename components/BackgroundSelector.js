function BackgroundSelector({ canvas }) {
    const backgrounds = [
        { name: 'Solid White', value: '#FFFFFF' },
        { name: 'Light Gray', value: '#F0F0F0' },
        { name: 'Soft Pink', value: '#FFE4E1' },
        { name: 'Mint Green', value: '#F0FFF0' },
        { name: 'Sky Blue', value: '#F0F8FF' },
        { name: 'Lavender', value: '#E6E6FA' }
    ];

    const setBackground = (color) => {
        try {
            setCanvasBackground(canvas, color);
        } catch (error) {
            reportError(error);
        }
    };

    const handleImageUpload = (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    fabric.Image.fromURL(event.target.result, (img) => {
                        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                            scaleX: canvas.width / img.width,
                            scaleY: canvas.height / img.height,
                            stretch: true
                        });
                    });
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="tool-section" data-name="background-selector">
            <h3 className="tool-title">Background</h3>
            
            <div className="mb-4" data-name="color-backgrounds">
                {backgrounds.map(bg => (
                    <button
                        key={bg.value}
                        className="tool-button flex items-center"
                        onClick={() => setBackground(bg.value)}
                        data-name={`bg-${bg.name.toLowerCase().replace(' ', '-')}`}
                    >
                        <div 
                            className="w-6 h-6 rounded mr-2"
                            style={{ backgroundColor: bg.value }}
                        />
                        {bg.name}
                    </button>
                ))}
            </div>

            <div className="mt-4" data-name="image-upload">
                <p className="text-sm mb-2">Upload Background Image</p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                    data-name="background-image-input"
                />
            </div>
        </div>
    );
}
function BackgroundPicker({ canvas, onClose }) {
    const solidColors = [
        { name: 'White', value: '#FFFFFF' },
        { name: 'Light Gray', value: '#F0F0F0' },
        { name: 'Soft Pink', value: '#FFE4E1' },
        { name: 'Mint Green', value: '#F0FFF0' },
        { name: 'Sky Blue', value: '#F0F8FF' },
        { name: 'Lavender', value: '#E6E6FA' },
        { name: 'Peach', value: '#FFDAB9' },
        { name: 'Light Yellow', value: '#FFFACD' },
        { name: 'Soft Purple', value: '#E6E6FA' },
        { name: 'Pale Turquoise', value: '#AFEEEE' }
    ];

    const gradients = [
        { 
            name: 'Sunset',
            colors: ['#FF512F', '#F09819']
        },
        {
            name: 'Ocean',
            colors: ['#2193b0', '#6dd5ed']
        },
        {
            name: 'Purple Love',
            colors: ['#cc2b5e', '#753a88']
        },
        {
            name: 'Fresh Grass',
            colors: ['#00b09b', '#96c93d']
        },
        {
            name: 'Pink Dream',
            colors: ['#ff6e7f', '#bfe9ff']
        }
    ];

    const setSolidBackground = (color) => {
        try {
            canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
        } catch (error) {
            reportError(error);
        }
    };

    const setGradientBackground = (gradient) => {
        try {
            const grad = new fabric.Gradient({
                type: 'linear',
                coords: {
                    x1: 0,
                    y1: 0,
                    x2: canvas.width,
                    y2: canvas.height,
                },
                colorStops: [
                    { offset: 0, color: gradient.colors[0] },
                    { offset: 1, color: gradient.colors[1] }
                ]
            });
            canvas.setBackgroundColor(grad, canvas.renderAll.bind(canvas));
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="background-picker" data-name="background-picker">
            <div className="mb-4" data-name="solid-colors">
                <h3 className="text-sm font-semibold mb-2">Solid Colors</h3>
                <div className="grid grid-cols-5 gap-2">
                    {solidColors.map(color => (
                        <button
                            key={color.value}
                            className="w-8 h-8 rounded border-2"
                            style={{ backgroundColor: color.value }}
                            onClick={() => setSolidBackground(color.value)}
                            title={color.name}
                            data-name={`color-${color.name.toLowerCase().replace(' ', '-')}`}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-4" data-name="gradients">
                <h3 className="text-sm font-semibold mb-2">Gradients</h3>
                <div className="grid grid-cols-2 gap-2">
                    {gradients.map(gradient => (
                        <button
                            key={gradient.name}
                            className="h-12 rounded"
                            style={{
                                background: `linear-gradient(to right, ${gradient.colors[0]}, ${gradient.colors[1]})`
                            }}
                            onClick={() => setGradientBackground(gradient)}
                            title={gradient.name}
                            data-name={`gradient-${gradient.name.toLowerCase().replace(' ', '-')}`}
                        />
                    ))}
                </div>
            </div>

            <button
                className="w-full py-2 text-center text-gray-600 hover:text-gray-800"
                onClick={onClose}
                data-name="close-background-picker"
            >
                <i className="fas fa-times mr-2"></i>
                Close
            </button>
        </div>
    );
}
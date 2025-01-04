function DrawingTool({ canvas }) {
    const [brushColor, setBrushColor] = React.useState('#000000');
    const [brushSize, setBrushSize] = React.useState(5);

    const handleColorChange = (color) => {
        try {
            setBrushColor(color);
            if (canvas) {
                canvas.freeDrawingBrush.color = color;
                canvas.renderAll();
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleSizeChange = (size) => {
        try {
            setBrushSize(size);
            if (canvas) {
                canvas.freeDrawingBrush.width = size;
                canvas.renderAll();
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="tool-options" data-name="drawing-options">
            <div className="mb-4" data-name="brush-size">
                <p className="text-sm mb-2">Brush Size: {brushSize}px</p>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => handleSizeChange(parseInt(e.target.value))}
                    className="w-full"
                    data-name="brush-size-slider"
                />
            </div>
            <ColorPicker color={brushColor} onChange={handleColorChange} />
        </div>
    );
}

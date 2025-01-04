function TextTool({ canvas }) {
    const [fontSize, setFontSize] = React.useState(20);
    const [textColor, setTextColor] = React.useState('#000000');
    const [fontFamily, setFontFamily] = React.useState('Arial');
    const [activeTextObject, setActiveTextObject] = React.useState(null);

    const fontFamilies = [
        { value: 'Arial', label: 'Arial' },
        { value: 'Helvetica', label: 'Helvetica' },
        { value: 'Times New Roman', label: 'Times New Roman' },
        { value: 'Courier New', label: 'Courier New' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Verdana', label: 'Verdana' },
        { value: 'Impact', label: 'Impact' },
        { value: 'Comic Sans MS', label: 'Comic Sans' },
        { value: 'Trebuchet MS', label: 'Trebuchet' },
        { value: 'Quicksand', label: 'Quicksand' }
    ];

    // Initialize text tool with selected object's properties
    React.useEffect(() => {
        try {
            const handleSelectionChange = () => {
                const activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type.includes('text')) {
                    setActiveTextObject(activeObject);
                    setFontSize(activeObject.get('fontSize') || 20);
                    setTextColor(activeObject.get('fill') || '#000000');
                    setFontFamily(activeObject.get('fontFamily') || 'Arial');
                } else {
                    setActiveTextObject(null);
                }
            };

            const handleSelectionCleared = () => {
                setActiveTextObject(null);
            };

            canvas.on('selection:created', handleSelectionChange);
            canvas.on('selection:updated', handleSelectionChange);
            canvas.on('selection:cleared', handleSelectionCleared);

            // Initial check for active object
            const currentActive = canvas.getActiveObject();
            if (currentActive && currentActive.type.includes('text')) {
                handleSelectionChange();
            }

            return () => {
                canvas.off('selection:created', handleSelectionChange);
                canvas.off('selection:updated', handleSelectionChange);
                canvas.off('selection:cleared', handleSelectionCleared);
            };
        } catch (error) {
            reportError(error);
        }
    }, [canvas]);

    const updateTextProperty = (property, value) => {
        try {
            if (!canvas || !activeTextObject) return;

            // Update the object property
            activeTextObject.set(property, value);
            canvas.renderAll();

            // Update corresponding state
            switch (property) {
                case 'fontSize':
                    setFontSize(value);
                    break;
                case 'fill':
                    setTextColor(value);
                    break;
                case 'fontFamily':
                    setFontFamily(value);
                    break;
                default:
                    break;
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleFontSizeChange = (e) => {
        try {
            const newSize = parseInt(e.target.value);
            updateTextProperty('fontSize', newSize);
        } catch (error) {
            reportError(error);
        }
    };

    const handleColorChange = (newColor) => {
        try {
            updateTextProperty('fill', newColor);
        } catch (error) {
            reportError(error);
        }
    };

    const handleFontFamilyChange = (e) => {
        try {
            updateTextProperty('fontFamily', e.target.value);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="tool-options" data-name="text-options">
            <div className="mb-4" data-name="font-family">
                <p className="text-sm mb-2">Font Family</p>
                <select
                    value={fontFamily}
                    onChange={handleFontFamilyChange}
                    className="w-full p-2 border rounded bg-white"
                    data-name="font-family-select"
                >
                    {fontFamilies.map(font => (
                        <option 
                            key={font.value} 
                            value={font.value}
                            style={{ fontFamily: font.value }}
                        >
                            {font.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4" data-name="font-size">
                <p className="text-sm mb-2">Font Size: {fontSize}px</p>
                <input
                    type="range"
                    min="12"
                    max="72"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="w-full"
                    data-name="font-size-slider"
                />
            </div>
            <ColorPicker color={textColor} onChange={handleColorChange} />
        </div>
    );
}
function FloatingToolbar({ activeTool, setActiveTool, canvas }) {
    const [showColorPicker, setShowColorPicker] = React.useState(false);
    const [showTextOptions, setShowTextOptions] = React.useState(false);
    const [showMediaLibrary, setShowMediaLibrary] = React.useState(false);
    const fileInputRef = React.useRef(null);

    const tools = [
        { id: 'select', icon: 'fa-mouse-pointer', label: 'Select' },
        { id: 'text', icon: 'fa-font', label: 'Text' },
        { id: 'draw', icon: 'fa-pen', label: 'Draw' },
        { id: 'shape', icon: 'fa-shapes', label: 'Shape' },
        { id: 'image', icon: 'fa-image', label: 'Image' },
        { id: 'media', icon: 'fa-icons', label: 'Media Library' },
        { id: 'background', icon: 'fa-fill-drip', label: 'Background' },
        { id: 'delete', icon: 'fa-trash', label: 'Delete' }
    ];

    React.useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', handleSelection);
            canvas.on('selection:updated', handleSelection);
            canvas.on('selection:cleared', () => setShowTextOptions(false));
            
            return () => {
                canvas.off('selection:created');
                canvas.off('selection:updated');
                canvas.off('selection:cleared');
            };
        }
    }, [canvas]);

    const handleSelection = (event) => {
        try {
            const activeObject = event.selected[0];
            if (activeObject && activeObject.type === 'i-text') {
                setShowTextOptions(true);
                setActiveTool('text');
            } else {
                setShowTextOptions(false);
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleToolClick = (toolId) => {
        try {
            if (toolId === 'delete') {
                deleteSelectedObjects();
                return;
            }

            // Close all panels first
            setShowColorPicker(false);
            setShowMediaLibrary(false);
            setShowTextOptions(false);

            // If clicking the same tool, deactivate it
            if (toolId === activeTool) {
                setActiveTool(null);
                disableAllModes();
                return;
            }

            // Set new active tool and handle specific tool actions
            setActiveTool(toolId);
            handleToolMode(toolId);
        } catch (error) {
            reportError(error);
        }
    };

    const deleteSelectedObjects = () => {
        try {
            const activeObjects = canvas.getActiveObjects();
            activeObjects.forEach(obj => canvas.remove(obj));
            canvas.discardActiveObject();
            canvas.renderAll();
        } catch (error) {
            reportError(error);
        }
    };

    const handleToolMode = (toolId) => {
        try {
            disableAllModes();
            
            switch(toolId) {
                case 'select':
                    enableSelectMode();
                    break;
                case 'text':
                    enableTextMode();
                    setShowTextOptions(true);
                    break;
                case 'draw':
                    enableDrawMode();
                    break;
                case 'shape':
                    enableSelectMode();
                    break;
                case 'image':
                    fileInputRef.current.click();
                    break;
                case 'media':
                    setShowMediaLibrary(true);
                    break;
                case 'background':
                    setShowColorPicker(true);
                    break;
                default:
                    break;
            }
        } catch (error) {
            reportError(error);
        }
    };

    const disableAllModes = () => {
        try {
            canvas.isDrawingMode = false;
            canvas.defaultCursor = 'default';
            canvas.selection = true;
            canvas.off('mouse:down');
            setShowColorPicker(false);
            setShowMediaLibrary(false);
            setShowTextOptions(false);
        } catch (error) {
            reportError(error);
        }
    };

    const enableSelectMode = () => {
        try {
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.isDrawingMode = false;
            canvas.off('mouse:down');
        } catch (error) {
            reportError(error);
        }
    };

    const enableTextMode = () => {
        try {
            canvas.defaultCursor = 'text';
            canvas.isDrawingMode = false;
            canvas.selection = false;
            canvas.off('mouse:down');
            canvas.on('mouse:down', addTextAtPoint);
        } catch (error) {
            reportError(error);
        }
    };

    const enableDrawMode = () => {
        try {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = 5;
            canvas.freeDrawingBrush.color = '#000000';
            canvas.defaultCursor = 'crosshair';
            canvas.selection = false;
            canvas.off('mouse:down');
        } catch (error) {
            reportError(error);
        }
    };

    const addTextAtPoint = (options) => {
        try {
            const pointer = canvas.getPointer(options.e);
            const text = new fabric.IText('Click to edit', {
                left: pointer.x,
                top: pointer.y,
                fontSize: 20,
                fill: '#000000',
                fontFamily: 'Arial'
            });
            canvas.add(text);
            canvas.setActiveObject(text);
            text.enterEditing();
            canvas.renderAll();
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
                        img.scaleToWidth(200);
                        canvas.add(img);
                        canvas.renderAll();
                    });
                };
                reader.readAsDataURL(file);
            }
            e.target.value = '';
            setActiveTool('select');
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <React.Fragment>
            <div className="floating-toolbar" data-name="floating-toolbar">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        className={`icon-button ${activeTool === tool.id ? 'active' : ''}`}
                        onClick={() => handleToolClick(tool.id)}
                        title={tool.label}
                        data-name={`tool-${tool.id}`}
                    >
                        <i className={`fas ${tool.icon}`}></i>
                    </button>
                ))}
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    accept="image/*"
                    data-name="image-upload-input"
                />
            </div>

            {showColorPicker && (
                <div className="color-picker-popup" data-name="background-color-picker">
                    <BackgroundPicker 
                        canvas={canvas}
                        onClose={() => setShowColorPicker(false)}
                    />
                </div>
            )}

            {showMediaLibrary && (
                <div className="media-library-popup" data-name="media-library">
                    <MediaLibrary 
                        canvas={canvas}
                        onClose={() => setShowMediaLibrary(false)}
                    />
                </div>
            )}

            {showTextOptions && activeTool === 'text' && <TextTool canvas={canvas} />}
            {activeTool === 'draw' && <DrawingTool canvas={canvas} />}
            {activeTool === 'shape' && <ShapeTool canvas={canvas} />}
        </React.Fragment>
    );
}
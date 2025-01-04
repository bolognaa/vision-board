function App() {
    const [canvas, setCanvas] = React.useState(null);
    const [activeTool, setActiveTool] = React.useState(null);

    React.useEffect(() => {
        try {
            initCanvas();
        } catch (error) {
            reportError(error);
        }
    }, []);

    React.useEffect(() => {
        try {
            if (canvas) {
                const handleKeyDown = (e) => {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                        const activeObjects = canvas.getActiveObjects();
                        if (activeObjects.length > 0) {
                            activeObjects.forEach(obj => canvas.remove(obj));
                            canvas.discardActiveObject();
                            canvas.renderAll();
                        }
                    }
                };

                window.addEventListener('keydown', handleKeyDown);

                return () => {
                    window.removeEventListener('keydown', handleKeyDown);
                };
            }
        } catch (error) {
            reportError(error);
        }
    }, [canvas]);

    const initCanvas = () => {
        try {
            const canvas = new fabric.Canvas('vision-board', {
                width: window.innerWidth,
                height: window.innerHeight,
            });

            // Set default Pink Dream gradient
            const grad = new fabric.Gradient({
                type: 'linear',
                coords: {
                    x1: 0,
                    y1: 0,
                    x2: canvas.width,
                    y2: canvas.height,
                },
                colorStops: [
                    { offset: 0, color: '#ff6e7f' },
                    { offset: 1, color: '#bfe9ff' }
                ]
            });
            canvas.setBackgroundColor(grad, canvas.renderAll.bind(canvas));

            // Initialize with default template
            initializeTemplate(canvas);

            setCanvas(canvas);

            window.addEventListener('resize', () => {
                canvas.setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            });
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="app-container" data-name="app-container">
            <div className="canvas-container" data-name="canvas-container">
                <div className="canvas-wrapper" data-name="canvas-wrapper">
                    <canvas id="vision-board" data-name="vision-board"></canvas>
                </div>
            </div>
            <FloatingToolbar 
                activeTool={activeTool} 
                setActiveTool={setActiveTool}
                canvas={canvas}
            />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
function ShapeTool({ canvas }) {
    const [shapeType, setShapeType] = React.useState('rectangle');
    const [shapeColor, setShapeColor] = React.useState('#000000');
    const [strokeWidth, setStrokeWidth] = React.useState(2);
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [startPoint, setStartPoint] = React.useState(null);
    const [activeShape, setActiveShape] = React.useState(null);

    React.useEffect(() => {
        try {
            if (!canvas) return;

            const handleSelectionChange = () => {
                const activeObject = canvas.getActiveObject();
                if (activeObject && (activeObject.type === 'rect' || activeObject.type === 'circle')) {
                    setShapeColor(activeObject.stroke || '#000000');
                    setStrokeWidth(activeObject.strokeWidth || 2);
                }
            };

            canvas.on('selection:created', handleSelectionChange);
            canvas.on('selection:updated', handleSelectionChange);

            const handleMouseDown = (options) => {
                if (!canvas.isDrawingMode) {
                    setIsDrawing(true);
                    const pointer = canvas.getPointer(options.e);
                    setStartPoint({ x: pointer.x, y: pointer.y });

                    let shape;
                    switch (shapeType) {
                        case 'rectangle':
                            shape = new fabric.Rect({
                                left: pointer.x,
                                top: pointer.y,
                                width: 0,
                                height: 0,
                                fill: 'transparent',
                                stroke: shapeColor,
                                strokeWidth: strokeWidth
                            });
                            break;
                        case 'circle':
                            shape = new fabric.Circle({
                                left: pointer.x,
                                top: pointer.y,
                                radius: 0,
                                fill: 'transparent',
                                stroke: shapeColor,
                                strokeWidth: strokeWidth
                            });
                            break;
                    }

                    if (shape) {
                        canvas.add(shape);
                        setActiveShape(shape);
                        canvas.setActiveObject(shape);
                    }
                }
            };

            const handleMouseMove = (options) => {
                if (!isDrawing || !startPoint || !activeShape) return;

                const pointer = canvas.getPointer(options.e);
                const width = pointer.x - startPoint.x;
                const height = pointer.y - startPoint.y;

                switch (shapeType) {
                    case 'rectangle':
                        if (width > 0) {
                            activeShape.set('width', width);
                        } else {
                            activeShape.set({ left: pointer.x, width: Math.abs(width) });
                        }
                        if (height > 0) {
                            activeShape.set('height', height);
                        } else {
                            activeShape.set({ top: pointer.y, height: Math.abs(height) });
                        }
                        break;
                    case 'circle':
                        const radius = Math.sqrt(width * width + height * height) / 2;
                        activeShape.set({
                            radius: radius,
                            left: startPoint.x - radius,
                            top: startPoint.y - radius
                        });
                        break;
                }

                canvas.renderAll();
            };

            const handleMouseUp = () => {
                setIsDrawing(false);
                setActiveShape(null);
                canvas.renderAll();
            };

            canvas.on('mouse:down', handleMouseDown);
            canvas.on('mouse:move', handleMouseMove);
            canvas.on('mouse:up', handleMouseUp);

            return () => {
                canvas.off('selection:created', handleSelectionChange);
                canvas.off('selection:updated', handleSelectionChange);
                canvas.off('mouse:down', handleMouseDown);
                canvas.off('mouse:move', handleMouseMove);
                canvas.off('mouse:up', handleMouseUp);
            };
        } catch (error) {
            reportError(error);
        }
    }, [canvas, isDrawing, startPoint, activeShape, shapeType, shapeColor, strokeWidth]);

    const handle

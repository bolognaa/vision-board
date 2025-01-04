function Canvas({ canvas }) {
    const handleDrop = React.useCallback((e) => {
        try {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
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
        } catch (error) {
            reportError(error);
        }
    }, [canvas]);

    const handleDragOver = React.useCallback((e) => {
        e.preventDefault();
    }, []);

    React.useEffect(() => {
        if (canvas) {
            const canvasElement = document.getElementById('vision-board');
            canvasElement.addEventListener('drop', handleDrop);
            canvasElement.addEventListener('dragover', handleDragOver);

            return () => {
                canvasElement.removeEventListener('drop', handleDrop);
                canvasElement.removeEventListener('dragover', handleDragOver);
            };
        }
    }, [canvas, handleDrop, handleDragOver]);

    return null;
}
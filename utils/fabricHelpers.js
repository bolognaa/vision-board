function addImageToCanvas(canvas, imageUrl) {
    try {
        fabric.Image.fromURL(imageUrl, (img) => {
            img.scaleToWidth(200);
            canvas.add(img);
            canvas.renderAll();
        });
    } catch (error) {
        reportError(error);
    }
}

function addTextToCanvas(canvas, text) {
    try {
        const textObj = new fabric.Text(text, {
            left: 100,
            top: 100,
            fontSize: 20,
            fill: '#000000'
        });
        canvas.add(textObj);
        canvas.renderAll();
    } catch (error) {
        reportError(error);
    }
}

function setCanvasBackground(canvas, color) {
    try {
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    } catch (error) {
        reportError(error);
    }
}

function enableDrawingMode(canvas) {
    try {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = 5;
        canvas.freeDrawingBrush.color = '#000000';
    } catch (error) {
        reportError(error);
    }
}

function disableDrawingMode(canvas) {
    try {
        canvas.isDrawingMode = false;
    } catch (error) {
        reportError(error);
    }
}
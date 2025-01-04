const defaultTemplate = {
    title: {
        text: 'Vision 2025',
        fontSize: 72,
        fontFamily: 'Quicksand',
        fill: '#13021c',
        top: 50,
        left: 50
    },
    sections: [
        {
            title: 'Career Goals',
            text: 'Senior Developer',
            icon: 'https://cdn-icons-png.flaticon.com/512/8867/8867510.png',
            left: 100,
            top: 200
        },
        {
            title: 'Health Goals',
            text: 'Daily Exercise',
            icon: 'https://cdn-icons-png.flaticon.com/512/8408/8408246.png',
            left: 400,
            top: 200
        },
        {
            title: 'Personal Growth',
            text: 'Learn New Skills',
            icon: 'https://cdn-icons-png.flaticon.com/512/7649/7649353.png',
            left: 700,
            top: 200
        }
    ],
    decorations: [
        {
            type: 'animation',
            url: 'https://assets-v2.lottiefiles.com/a/2d25fd12-1165-11ee-a454-ebc40bd79c26/CsYkokajEC.gif',
            left: 200,
            top: 400,
            width: 150
        },
        {
            type: 'icon',
            url: 'https://cdn-icons-png.flaticon.com/512/6381/6381546.png',
            left: 500,
            top: 450,
            width: 80
        }
    ]
};

function initializeTemplate(canvas) {
    try {
        // Add main title as IText
        const title = new fabric.IText(defaultTemplate.title.text, {
            ...defaultTemplate.title,
            originX: 'left',
            originY: 'top'
        });
        canvas.add(title);

        // Add sections with their titles, text, and icons
        defaultTemplate.sections.forEach(section => {
            // Add section title as IText
            const sectionTitle = new fabric.IText(section.title, {
                left: section.left,
                top: section.top,
                fontSize: 24,
                fontFamily: 'Quicksand',
                fill: '#13021c',
                fontWeight: 'bold'
            });
            canvas.add(sectionTitle);

            // Add section text as IText
            const sectionText = new fabric.IText(section.text, {
                left: section.left,
                top: section.top + 40,
                fontSize: 18,
                fontFamily: 'Quicksand',
                fill: '#666666'
            });
            canvas.add(sectionText);

            // Add section icon
            fabric.Image.fromURL(section.icon, (img) => {
                img.set({
                    left: section.left + 100,
                    top: section.top,
                    scaleX: 0.4,
                    scaleY: 0.4
                });
                canvas.add(img);
                canvas.renderAll();
            });
        });

        // Add decorative elements
        defaultTemplate.decorations.forEach(decoration => {
            fabric.Image.fromURL(decoration.url, (img) => {
                img.set({
                    left: decoration.left,
                    top: decoration.top,
                    originX: 'left',
                    originY: 'top'
                });
                
                if (decoration.width) {
                    img.scaleToWidth(decoration.width);
                }
                
                canvas.add(img);
                canvas.renderAll();
            });
        });

        canvas.renderAll();
    } catch (error) {
        reportError(error);
    }
}
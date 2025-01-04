function ThemeSelector({ canvas }) {
    const themes = [
        {
            name: 'Professional',
            background: '#FFFFFF',
            accent: '#2C3E50',
            font: 'Arial'
        },
        {
            name: 'Creative',
            background: '#FFE4E1',
            accent: '#FF69B4',
            font: 'Comic Sans MS'
        },
        {
            name: 'Nature',
            background: '#F0FFF0',
            accent: '#228B22',
            font: 'Georgia'
        },
        {
            name: 'Tech',
            background: '#F0F8FF',
            accent: '#4169E1',
            font: 'Courier New'
        }
    ];

    const applyTheme = (theme) => {
        try {
            // Set background
            setCanvasBackground(canvas, theme.background);

            // Update all text objects with theme font
            canvas.getObjects('text').forEach(obj => {
                obj.set({
                    fontFamily: theme.font,
                    fill: theme.accent
                });
            });

            canvas.renderAll();
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="tool-section" data-name="theme-selector">
            <h3 className="tool-title">Themes</h3>
            
            {themes.map(theme => (
                <button
                    key={theme.name}
                    className="tool-button flex items-center"
                    onClick={() => applyTheme(theme)}
                    data-name={`theme-${theme.name.toLowerCase()}`}
                >
                    <div 
                        className="w-6 h-6 rounded mr-2"
                        style={{ backgroundColor: theme.accent }}
                    />
                    {theme.name}
                </button>
            ))}
        </div>
    );
}
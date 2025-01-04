function ColorPicker({ color, onChange }) {
    const colors = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
        '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
        '#008000', '#800000', '#008080', '#FFC0CB', '#A52A2A'
    ];

    return (
        <div className="color-picker" data-name="color-picker">
            <p className="text-sm mb-2">Color</p>
            <div className="flex flex-wrap gap-2 mb-3" data-name="preset-colors">
                {colors.map(c => (
                    <button
                        key={c}
                        className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-gray-600' : 'border-gray-200'}`}
                        style={{ backgroundColor: c }}
                        onClick={() => onChange(c)}
                        data-name={`color-${c.replace('#', '')}`}
                    />
                ))}
            </div>
            <div className="custom-color-input" data-name="custom-color">
                <p className="text-sm mb-1">Custom Color</p>
                <div className="flex gap-2 items-center">
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => onChange(e.target.value)}
                        className="custom-color-picker"
                        data-name="color-input"
                    />
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => {
                            const newColor = e.target.value;
                            if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
                                onChange(newColor);
                            }
                        }}
                        className="flex-1 p-2 border rounded text-sm"
                        placeholder="#000000"
                        maxLength="7"
                        data-name="color-hex-input"
                    />
                </div>
            </div>
        </div>
    );
}
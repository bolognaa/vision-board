function Toolbar({ activeTab, setActiveTab, canvas }) {
    const tabs = [
        { id: 'themes', label: 'Themes' },
        { id: 'backgrounds', label: 'Backgrounds' },
        { id: 'text', label: 'Text' },
        { id: 'draw', label: 'Draw' }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'themes':
                return <ThemeSelector canvas={canvas} />;
            case 'backgrounds':
                return <BackgroundSelector canvas={canvas} />;
            case 'text':
                return <TextTool canvas={canvas} />;
            case 'draw':
                return <DrawingTool canvas={canvas} />;
            default:
                return null;
        }
    };

    return (
        <div className="toolbar" data-name="toolbar">
            <div className="tool-section" data-name="tool-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tool-button ${activeTab === tab.id ? 'bg-gray-200' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        data-name={`tab-${tab.id}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {renderContent()}
        </div>
    );
}
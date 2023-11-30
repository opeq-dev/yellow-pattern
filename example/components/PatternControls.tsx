interface PatternControlsProps {
  svg: SVGElement | null;
  onGenerateClick: () => void;
}
export const PatternControls = ({
  onGenerateClick,
  svg,
}: PatternControlsProps) => {
  const onSaveClick = () => {
    if (!svg) return;

    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml',
    });

    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');

    downloadLink.href = svgUrl;
    downloadLink.download = `pattern.svg`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <button onClick={onSaveClick}>Save</button>
      <button onClick={onGenerateClick}>Generate</button>
    </div>
  );
};

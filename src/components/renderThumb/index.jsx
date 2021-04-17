export default function RenderThumb({style, ...props}) {
  const thumbStyle = {
    width: '6px',
    backgroundColor: '#722ed1',
    opacity: '0.3',
    borderRadius: '6px',
    right: '0',
    top: '5px'
  }
  return (
    <div style={{...style, ...thumbStyle}} {...props} />
  )
}

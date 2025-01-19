const ICONS = [
  { src: 'src/assets/data.svg', label: 'Upload data' },
  { src: 'src/assets/Group 1.svg', label: 'Generate diagram' },
  { src: 'src/assets/template.svg', label: 'Templates' },
  { src: 'src/assets/styling.svg', label: 'Styling' },
];

const sectionStyle: React.CSSProperties = {
  alignSelf: 'stretch',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 10,
  display: 'inline-flex',
};

const iconContainerStyle: React.CSSProperties = {
  width: 53.1,
  height: 52.2,
  padding: 9,
  borderRadius: 18,
  overflow: 'hidden',
  border: '0.90px #2E2E2E solid',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 9,
  display: 'inline-flex',
};

const textStyle: React.CSSProperties = {
  textAlign: 'center',  // Correct type
  color: '#CFCECE',
  fontSize: 12,
  fontFamily: 'Lato',
  fontWeight: '600',
  wordWrap: 'break-word',
};

export default function Sidebar() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingBottom: 10,
        background: '#1E1F1F',
        borderRight: '1px #2E2E2E solid',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 28,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          alignSelf: 'stretch',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 12,
          paddingBottom: 12,
          borderBottom: '1px #2E2E2E solid',
          textAlign: 'center' as const,  // Ensure correct type is inferred
          color: 'white',
          fontSize: 12,
          fontFamily: 'Lato',
          fontWeight: '600',
        }}
      >
        Project MajMap
      </div>

      {ICONS.map(({ src, label }, index) => (
        <div key={index} style={sectionStyle}>
          <div
            style={{
              flex: '1 1 0',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
            }}
          >
            <div style={iconContainerStyle}>
              <img src={src} alt={label} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={textStyle}>{label}</div>
          </div>
        </div>
      ))}

      <div
        style={{
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 10,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            flex: '1 1 0',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex',
          }}
        >
          <div
            style={{
              width: 53.1,
              height: 52.2,
              padding: 9,
              borderRadius: 18,
              overflow: 'hidden',
              border: '0.90px #2E2E2E solid',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 9,
              display: 'inline-flex',
            }}
          >
            <div
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 3.6,
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: 5.4,
                  height: 5.4,
                  background: '#E3E3E3',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 5.4,
                  height: 5.4,
                  background: '#E3E3E3',
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 5.4,
                  height: 5.4,
                  background: '#E3E3E3',
                  borderRadius: 9999,
                }}
              />
            </div>
          </div>
          <div style={textStyle}>More actions</div>
        </div>
      </div>
    </div>
  );
}

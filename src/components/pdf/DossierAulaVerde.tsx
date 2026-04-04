import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Registro de fuente estándar
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: { backgroundColor: '#F9F8F4', paddingTop: 40, paddingBottom: 60, paddingHorizontal: 40, fontFamily: 'Open Sans' },
  headerImage: { height: 260, marginLeft: -40, marginRight: -40, marginTop: -40, objectFit: 'cover' },
  titleBox: { backgroundColor: '#005333', padding: 25, marginTop: -40, borderRadius: 12 },
  title: { fontSize: 32, color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#D4AF37', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 },
  sectionTitle: { fontSize: 22, color: '#005333', fontWeight: 'bold', marginTop: 25, marginBottom: 15, borderBottom: '2pt solid #D4AF37', paddingBottom: 5 },
  text: { fontSize: 12, color: '#2D2D2D', lineHeight: 1.6, marginBottom: 10 },
  boldText: { fontWeight: 'bold', color: '#005333' },
  bullet: { flexDirection: 'row', marginBottom: 8 },
  bulletDot: { width: 15, fontSize: 12, color: '#D4AF37', fontWeight: 'bold' },
  bulletText: { flex: 1, fontSize: 12, color: '#2D2D2D', lineHeight: 1.5 },
  imageRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  imageSmall: { width: '48%', height: 160, borderRadius: 10, objectFit: 'cover' },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  imageGridItem: { width: '48%', height: 170, borderRadius: 10, objectFit: 'cover', marginBottom: 15 },
  footer: { position: 'absolute', bottom: 20, left: 40, right: 40, borderTop: '1pt solid #D4AF37', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 10, color: '#666666' },
  disclaimer: { backgroundColor: '#D4AF37', padding: 20, borderRadius: 10, marginTop: 25 }
});

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bullet} wrap={false}>
    <Text style={styles.bulletDot}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const DossierAulaVerde = () => (
  <Document>
    {/* PÁGINA 1: PORTADA Y PROPUESTA */}
    <Page size="A4" style={styles.page} wrap>
      <View wrap={false}>
          <Image style={styles.headerImage} src="/uploads/Aula%20Verde/IMG-20251118-WA0085.jpg" />
          <View style={styles.titleBox}>
            <Text style={styles.title}>AULA VERDE</Text>
            <Text style={styles.subtitle}>Propuesta Institucional</Text>
          </View>
      </View>

      <View wrap={false}>
          <Text style={styles.sectionTitle}>¿Quiénes Somos?</Text>
          <Text style={styles.text}>
          Mágico Ensueño es un eco-refugio premium en Sierras Grandes, concebido para brindar experiencias vivenciales desconectadas de las pantallas y 100% integradas a la naturaleza, enfocadas en el aprendizaje dinámico y el desarrollo personal grupal.
          </Text>
      </View>

      <View wrap={false}>
          <Text style={styles.sectionTitle}>Nuestra Propuesta Diferencial</Text>
          <Text style={styles.text}>
          "Aula Verde" nace para ofrecer a colegios, profesores y coordinadores grupales, un formato de viaje seguro y en un entorno natural montañés, garantizando el confort del grupo para el mejor desempeño didáctico.
          </Text>
      </View>

      {/* Aquí quitamos el wrap={false} de este contenedor para que React-PDF divida los bullets libremente entre la página 1 y 2 */}
      <View style={{ marginTop: 10 }}>
        <BulletPoint><Text style={styles.boldText}>Aprendizaje Experiencial:</Text> Talleres de agroecología, huerta orgánica y fogones de reflexión profunda de curso.</BulletPoint>
        <BulletPoint><Text style={styles.boldText}>Infraestructura Premium:</Text> Salón Octogonal de 100m² para dinámicas cerradas, Domos Geodésicos herméticos y refugio calefaccionado.</BulletPoint>
        <BulletPoint><Text style={styles.boldText}>Seguridad Integral:</Text> Entorno cerrado de exclusividad con acceso apto para todo tipo de buses grandes.</BulletPoint>
      </View>

      {/* Footer Maestro */}
      <View fixed style={styles.footer}>
        <Text style={styles.footerText}>Mágico Ensueño | Dossier Aula Verde</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
      </View>
    </Page>

    {/* PÁGINA 2: CRONOGRAMA */}
    <Page size="A4" style={styles.page} wrap>
      <View wrap={false}>
          <Text style={styles.sectionTitle}>Cronograma Tipo (Desafío 2 Días)</Text>
          <Text style={styles.text}>A nivel pedagógico personalizamos por completo la estructura de horarios dependiendo el nivel madurativo del grupo de alumnos o scouts.</Text>
      </View>
      
      {/* Removemos el wrap={false} estricto para permitir saltos de hoja naturales en el cronograma */}
      <View style={{ marginTop: 15 }}>
          <Text style={[styles.boldText, { fontSize: 14, marginBottom: 8 }]}>DÍA 1: Inmersión y Conexión</Text>
          <BulletPoint>10:00 - Llegada fluida de los micros e instalación.</BulletPoint>
          <BulletPoint>11:00 - Asignación de Refugios y pautas principales de convivencia.</BulletPoint>
          <BulletPoint>13:00 - Almuerzo casero colectivo de bienvenida.</BulletPoint>
          <BulletPoint>15:00 - Taller interactivo guiado: Ecología y vida práctica.</BulletPoint>
          <BulletPoint>20:30 - Cena y armado del gran Fogón Integrador a la luz de las estrellas.</BulletPoint>
      </View>

      <View style={{ marginTop: 20 }}>
          <Text style={[styles.boldText, { fontSize: 14, marginBottom: 8 }]}>DÍA 2: Naturaleza y Desafío</Text>
          <BulletPoint>08:30 - Desayuno serrano caliente y nutritivo.</BulletPoint>
          <BulletPoint>09:30 - Senderismo y exploración segura de vertientes.</BulletPoint>
          <BulletPoint>13:30 - Almuerzo de cierre al disco de arado o parrilla.</BulletPoint>
          <BulletPoint>15:00 - Asamblea final, arte efímero y agradecimientos.</BulletPoint>
          <BulletPoint>16:30 - Despedida cálida de las instalaciones de Mágico Ensueño.</BulletPoint>
      </View>

      <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Nuestros Servicios Exclusivos Incluyen</Text>
          <BulletPoint><Text style={styles.boldText}>Alojamiento Total:</Text> Camas individuales confortables con baños de amplias duchas con agua caliente 24 hs.</BulletPoint>
          <BulletPoint><Text style={styles.boldText}>Gastronomía Adaptada:</Text> Pensión completa artesanal. Adaptada integralmente a alumnos celíacos, alérgicos o veganos sin cargo extra.</BulletPoint>
          <BulletPoint><Text style={styles.boldText}>Staff Bonificado:</Text> Coordinadores y docentes acceden al formato de liberados para unirse de acuerdo a cantidad.</BulletPoint>
      </View>

      <View style={styles.disclaimer} wrap={false}>
        <Text style={{ fontSize: 13, color: '#005333', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>
          No mantenemos tarifas generalizadas públicas porque diseñamos una vivencia a medida en base al volumen de pasajeros y viandas. Presioná el botón de WhatsApp en la web y un especialista arma tu cotización hoy mismo.
        </Text>
      </View>

      <View fixed style={styles.footer}>
        <Text style={styles.footerText}>Mágico Ensueño | Dossier Aula Verde</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
      </View>
    </Page>

    {/* PÁGINA 3: GALERÍA DE FOTOS REALES */}
    <Page size="A4" style={styles.page}>
      <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Galería en la Montaña</Text>
      <Text style={styles.text}>Instantáneas reales de la libertad, aprendizaje y risas que se viven desconectados del asfalto.</Text>

      <View style={styles.imageGrid}>
        <Image style={styles.imageGridItem} src="/uploads/Aula%20Verde/IMG-20251118-WA0056.jpg" />
        <Image style={styles.imageGridItem} src="/uploads/Aula%20Verde/IMG-20251120-WA0036.jpg" />
        <Image style={styles.imageGridItem} src="/uploads/Aula%20Verde/IMG-20251120-WA0057.jpg" />
        <Image style={styles.imageGridItem} src="/uploads/Aula%20Verde/IMG-20251120-WA0061.jpg" />
        <Image style={styles.imageGridItem} src="/uploads/Aula%20Verde/IMG-20251120-WA0063.jpg" />
        <Image style={styles.imageGridItem} src="/uploads/Aula%20Verde/IMG-20251120-WA0107.jpg" />
      </View>

      <View fixed style={styles.footer}>
        <Text style={styles.footerText}>Mágico Ensueño | Dossier Aula Verde</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
      </View>
    </Page>
  </Document>
);

export default DossierAulaVerde;

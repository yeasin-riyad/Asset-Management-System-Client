import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#888',
  },
});

const MyAssetPDF = ({ asset }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Asset Details</Text>
        <Text style={styles.text}>Company Name</Text>
        <Text style={styles.text}>Address</Text>
        <Text style={styles.text}>Contact Information</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Asset Information</Text>
        <Text style={styles.text}>Asset Name: {asset.asset.productName}</Text>
        <Text style={styles.text}>Asset Type: {asset.asset.assetType}</Text>
        <Text style={styles.text}>Request Date: {new Date(asset.requestDate).toLocaleDateString()}</Text>
        <Text style={styles.text}>Approval Date: {asset.status === 'approved' ? new Date(asset.approvalDate).toLocaleDateString() : 'N/A'}</Text>
        <Text style={styles.text}>Request Status: {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Printed on: {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

export default MyAssetPDF;

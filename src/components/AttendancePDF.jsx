import React from "react";
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20 },
  row: { marginBottom: 5 }
});

export default function AttendancePDF({ students, listName }) {
  const MyDoc = (
    <Document>
      <Page style={styles.page}>
        <Text>{listName}</Text>
        {students.map(s => (
          <Text key={s.id} style={styles.row}>
            {s.firstName} {s.lastName} - Matin: {s.morning ? "✔️" : ""} - Soir: {s.evening ? "✔️" : ""}
          </Text>
        ))}
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={MyDoc} fileName={`${listName}.pdf`}>
      {({ loading }) => (loading ? "Chargement..." : "Télécharger PDF")}
    </PDFDownloadLink>
  );
}

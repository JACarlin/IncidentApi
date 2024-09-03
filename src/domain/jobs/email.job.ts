import cron from 'node-cron';
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../service/email.service';
import { IncidentDataSource } from '../datasources/Incident.datasource';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJob = () => {

    cron.schedule('*/5 * * * * *', async () => {
        const emailService = new EmailService();
        const incidentDataSource = new IncidentDataSource();
        console.log("Cada 5 segundos")
        try {
            const incidents = await IncidentModel.find({ isEmailSent: false });
            if (!incidents.length) {
                console.log("No hay incidentes pendientes de enviar");
                return;
            }

            console.log(`procesando ${incidents.length} incidentes.`);

            await Promise.all(
                incidents.map(async (incident) => {
                    const htmlBody= generateIncidentEmailTemplate(
                        incident.title,
                        incident.description,
                        incident.lat,
                        incident.lng
                    )
                    await emailService.sendEmail({
                        to: "jorge.carlin@bluu.tech",
                        subject: `Incidente: ${incident.title}`,
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado para el incidente con ID: ${incident._id}`)
                    await incidentDataSource.updateIncident(incident._id.toString(),{... incident, isEmailSent: true})

                    console.log('incidente actualizado')
                }));
}catch (error) {
    console.error("Error durante el trabajo de envio de correos")
}
    })
}
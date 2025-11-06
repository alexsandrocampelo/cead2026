import React from 'react';
import type { SubmittedReport } from './types';
import {
    IconHeart, IconUsers, IconGraduationCap, IconClipboardList,
    IconGift, IconCheckCircle, IconArrowLeft
} from './constants';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
        <div className="flex items-center">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);


const Dashboard: React.FC<{ onBack: () => void; reports: SubmittedReport[] }> = ({ onBack, reports }) => {
    const validatedReports = reports.filter(r => r.status === 'validated');
    const data = validatedReports.map(r => r.data);

    const totalConversoes = data.reduce((sum, report) => sum + report.totalConversoes, 0);
    const totalAlunos = data.reduce((sum, report) => sum + report.discTotalAlunos, 0);
    const totalMatriculadosCead = data.reduce((sum, report) => sum + report.ceadTotal, 0);
    const totalEvangelismos = data.reduce((sum, report) =>
        sum +
        report.ativEvangelismoPessoal +
        report.ativEvangelismoTransito +
        report.ativEvangelismoInfantil +
        report.ativEvangelismoNoLar +
        report.ativEvangelismoNoturno, 0);
    const totalBencaos = data.reduce((sum, report) =>
        sum +
        report.bencaosBatismos +
        report.bencaosRenovos +
        report.bencaosCurasDivinas +
        report.bencaosOutros, 0);
    const totalBatismos = data.reduce((sum, report) => sum + report.bencaosBatismos, 0);

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
            <div className="flex justify-between items-center mb-8 border-b-2 border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard de Atividades</h1>
                <button
                    onClick={onBack}
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    <IconArrowLeft className="h-5 w-5 mr-2" /> Voltar ao Formulário
                </button>
            </div>
            
            {validatedReports.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <IconCheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700">Nenhum dado para exibir</h2>
                    <p className="text-gray-500 mt-2">Valide alguns relatórios na área do coordenador para ver as estatísticas aqui.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard icon={<IconHeart className="h-8 w-8 text-red-500" />} title="Total de Conversões" value={totalConversoes} color="border-red-500" />
                    <StatCard icon={<IconUsers className="h-8 w-8 text-purple-500" />} title="Total de Alunos (Discipulado)" value={totalAlunos} color="border-purple-500" />
                    <StatCard icon={<IconGraduationCap className="h-8 w-8 text-green-500" />} title="Matriculados na CEAD" value={totalMatriculadosCead} color="border-green-500" />
                    <StatCard icon={<IconClipboardList className="h-8 w-8 text-blue-500" />} title="Evangelismos Realizados" value={totalEvangelismos} color="border-blue-500" />
                    <StatCard icon={<IconGift className="h-8 w-8 text-yellow-500" />} title="Bênçãos Agradecidas" value={totalBencaos} color="border-yellow-500" />
                    <StatCard icon={<IconCheckCircle className="h-8 w-8 text-teal-500" />} title="Batismos" value={totalBatismos} color="border-teal-500" />
                </div>
            )}


            <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-inner">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Em Breve</h2>
                <p className="text-gray-600">Mais gráficos e análises detalhadas serão adicionados a este painel para fornecer insights ainda mais profundos sobre as atividades da igreja. Aguarde as próximas atualizações!</p>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import type { ReportData } from './types';
import {
  AREAS, MONTHS, WEEK_DAYS, SABADO_CULTOS,
  IconCheckCircle, IconDashboard, IconExport, IconInfo, IconBuilding,
  IconGraduationCap, IconClipboardList, IconUsers, IconHeart, IconGift,
  IconBookOpen, IconLocationMarker, IconBriefcase, IconShieldCheck, IconArrowLeft
} from './constants';
import Dashboard from './Dashboard';

const initialFormData: ReportData = {
  congregacao: '', area: '', mes: '', ano: '2025', whatsapp: '',
  ceadDirigente: 0, ceadViceDirigente: 0, ceadSecretaria: 0, ceadViceSecretaria: 0, ceadAdultos: 0, ceadJovens: 0, ceadAdolescentes: 0, ceadCriancas: 0, ceadTotal: 0,
  ativEvangelismoPessoal: 0, ativEvangelismoTransito: 0, ativEvangelismoInfantil: 0, ativEvangelismoNoLar: 0, ativEvangelismoNoturno: 0, ativCultoRelampago: 0, ativCultoMensal: 0, ativCultoMissoes: 0, ativPontoPregacao: 0, ativDomingo: '', ativCultoRodizio: 0, ativConsagracao: 0, ativConcentracaoEvangelica: 0, ativVisitaEnfermos: 0, ativVisitaNaoConvertidos: 0, ativCultoJovem: 0,
  freqDirigente: 0, freqViceDirigente: 0, freqSecretaria: 0, freqViceSecretaria: 0, freqAdultos: 0, freqJovens: 0, freqAdolescentes: 0, freqCriancas: 0,
  totalConversoes: 0,
  bencaosBatismos: 0, bencaosRenovos: 0, bencaosCurasDivinas: 0, bencaosOutros: 0,
  literaturaQuantidade: 0,
  areaConferenciaMissionaria: 0, areaPreCongresso: 0, areaFormaturaDiscipulado: 0, areaCruzadaEvangelistica: 0, areaCultoJovensUnificado: 0, areaSabadoCultoJovens: '',
  discTurmasBasico: 0, discTurmasIntermediario: 0, discTurmasAvancado: 0, discTotalTurmas: 0, discTotalProfessores: 0, discPossuiResponsavel: 'sim', discAlunosBasico: 0, discAlunosIntermediario: 0, discAlunosAvancado: 0, discTotalAlunos: 0, discAlunosAdolescentes: 0, discAlunosJovens: 0, discAlunosAdultos: 0, discAlunosIdosos: 0, discAlunosPcd: 0,
  discFreqTotalPresencas: 0, discFreqTotalAusencias: 0, discFreqNovosAlunosMes: 0, discFreqConcluintesAguardandoBatismo: 0,
  ministVisitasNovosConvertidos: 0, ministAconselhamentoIndividual: 0, ministVisitasMinisteriais: 0, ministVisitasApoiosArea: 0, ministDiasDiscipuladoFormouCultos: 0,
  dirigenteAssinatura: '', secretariaAssinatura: ''
};

const fieldLabels: { [key in keyof ReportData]?: string } = {
  congregacao: 'Congregação', area: 'Área', mes: 'Mês', ano: 'Ano', whatsapp: 'WhatsApp',
  ceadDirigente: 'CEAD: Dirigente', ceadViceDirigente: 'CEAD: Vice-Dirigente', ceadSecretaria: 'CEAD: Secretária', ceadViceSecretaria: 'CEAD: Vice-Secretária', ceadAdultos: 'CEAD: Adultos', ceadJovens: 'CEAD: Jovens', ceadAdolescentes: 'CEAD: Adolescentes', ceadCriancas: 'CEAD: Crianças', ceadTotal: 'CEAD: Total de Matriculados',
  ativEvangelismoPessoal: 'Atividade: Evangelismo Pessoal', ativEvangelismoTransito: 'Atividade: Evangelismo no Trânsito', ativEvangelismoInfantil: 'Atividade: Evangelismo Infantil', ativEvangelismoNoLar: 'Atividade: Evangelismo no Lar', ativEvangelismoNoturno: 'Atividade: Evangelismo Noturno', ativCultoRelampago: 'Atividade: Culto Relâmpago', ativCultoMensal: 'Atividade: Culto Mensal', ativCultoMissoes: 'Atividade: Culto de Missões', ativPontoPregacao: 'Atividade: Ponto de Pregação', ativDomingo: 'Atividade: Domingo', ativCultoRodizio: 'Atividade: Culto Rodízio', ativConsagracao: 'Atividade: Consagração', ativConcentracaoEvangelica: 'Atividade: Concentração Evangélica', ativVisitaEnfermos: 'Atividade: Visita aos Enfermos', ativVisitaNaoConvertidos: 'Atividade: Visita aos Não Convertidos', ativCultoJovem: 'Atividade: Culto Jovem',
  freqDirigente: 'Oração: Frequência do Dirigente', freqViceDirigente: 'Oração: Frequência do Vice-Dirigente', freqSecretaria: 'Oração: Frequência da Secretária', freqViceSecretaria: 'Oração: Frequência da Vice-Secretária', freqAdultos: 'Oração: Frequência de Adultos', freqJovens: 'Oração: Frequência de Jovens', freqAdolescentes: 'Oração: Frequência de Adolescentes', freqCriancas: 'Oração: Frequência de Crianças',
  totalConversoes: 'Total de Conversões',
  bencaosBatismos: 'Bênção: Batismos', bencaosRenovos: 'Bênção: Renovos', bencaosCurasDivinas: 'Bênção: Curas Divinas', bencaosOutros: 'Bênção: Outros',
  literaturaQuantidade: 'Literatura Distribuída (Quantidade)',
  areaConferenciaMissionaria: 'Área: Conferência Missionária', areaPreCongresso: 'Área: Pré-Congresso', areaFormaturaDiscipulado: 'Área: Formatura de Discipulado', areaCruzadaEvangelistica: 'Área: Cruzada Evangelística', areaCultoJovensUnificado: 'Área: Culto de Jovens Unificado', areaSabadoCultoJovens: 'Área: Sábado do Culto de Jovens',
  discTurmasBasico: 'Discipulado: Turmas Básico', discTurmasIntermediario: 'Discipulado: Turmas Intermediário', discTurmasAvancado: 'Discipulado: Turmas Avançado', discTotalTurmas: 'Discipulado: Total de Turmas', discTotalProfessores: 'Discipulado: Total de Professores', discPossuiResponsavel: 'Discipulado: Possui Responsável?', discAlunosBasico: 'Discipulado: Alunos Básico', discAlunosIntermediario: 'Discipulado: Alunos Intermediário', discAlunosAvancado: 'Discipulado: Alunos Avançado', discTotalAlunos: 'Discipulado: Total de Alunos', discAlunosAdolescentes: 'Discipulado: Alunos Adolescentes', discAlunosJovens: 'Discipulado: Alunos Jovens', discAlunosAdultos: 'Discipulado: Alunos Adultos', discAlunosIdosos: 'Discipulado: Alunos Idosos', discAlunosPcd: 'Discipulado: Alunos PcD', discFreqTotalPresencas: 'Discipulado: Total de Presenças', discFreqTotalAusencias: 'Discipulado: Total de Ausências', discFreqNovosAlunosMes: 'Discipulado: Novos Alunos no Mês', discFreqConcluintesAguardandoBatismo: 'Discipulado: Concluintes Aguardando Batismo',
  ministVisitasNovosConvertidos: 'Ministerial: Visitas a Novos Convertidos', ministAconselhamentoIndividual: 'Ministerial: Aconselhamento Individual', ministVisitasMinisteriais: 'Ministerial: Visitas Ministeriais', ministVisitasApoiosArea: 'Ministerial: Visitas de Apoios da Área', ministDiasDiscipuladoFormouCultos: 'Ministerial: Dias que Discipulado Formou em Cultos',
  dirigenteAssinatura: 'Assinatura do Dirigente', secretariaAssinatura: 'Assinatura da Secretária',
};

// --- Helper UI Components ---
interface SectionProps { title: string; icon: React.ReactNode; color: string; children: React.ReactNode; }
const Section: React.FC<SectionProps> = ({ title, icon, color, children }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
    <div className={`flex items-center p-4 text-white ${color}`}>{icon}<h2 className="text-xl font-bold ml-3">{title}</h2></div>
    <div className="p-6">{children}</div>
  </div>
);

interface FormFieldProps { label: string; name: keyof ReportData | string; value: string | number; onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; type?: string; placeholder?: string; required?: boolean; isSelect?: boolean; options?: string[]; description?: string; }
const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, type = 'text', placeholder, required = false, isSelect = false, options = [], description }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    {isSelect ? (
      <select id={name} name={name} value={value} onChange={onChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
        <option value="">Selecione</option>{options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    ) : (
      <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" />
    )}
    {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
  </div>
);

interface InfoBoxProps { children: React.ReactNode; color: 'blue' | 'yellow' | 'red' | 'green' | 'purple'; }
const InfoBox: React.FC<InfoBoxProps> = ({ children, color }) => {
    const colorClasses = { blue: 'bg-blue-50 border-blue-400 text-blue-700', yellow: 'bg-yellow-50 border-yellow-400 text-yellow-700', red: 'bg-red-50 border-red-400 text-red-700', green: 'bg-green-50 border-green-400 text-green-700', purple: 'bg-purple-50 border-purple-400 text-purple-700', };
    return (<div className={`p-4 border-l-4 ${colorClasses[color]} mb-6 rounded-r-md`}><div className="flex"><div className="flex-shrink-0"><IconInfo className="h-5 w-5" /></div><div className="ml-3"><p className="text-sm">{children}</p></div></div></div>);
};

const Header: React.FC<{ onDashboardClick: () => void; onCoordinatorClick: () => void; }> = ({ onDashboardClick, onCoordinatorClick }) => (
  <header className="bg-gray-800 text-white p-6 rounded-t-lg shadow-lg">
    <h1 className="text-2xl font-bold">IGREJA EVANGÉLICA ASSEMBLEIA DE DEUS</h1>
    <h2 className="text-3xl font-extrabold text-blue-300">EM PERNAMBUCO</h2>
    <div className="mt-4 text-sm text-gray-300"><p>Pastor Presidente: Pr. Ailton José Alves</p><p>Pastor Setorial: Pr. Sergio Correia</p></div>
    <p className="mt-2 text-gray-400">Sistema de Controle e Acompanhamento de Atividades</p>
    <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
      <div className="flex items-center">
        <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
        <div className="ml-3 text-sm"><p>Sincronização Automática Ativa</p><p className="text-gray-400">Última sync: {new Date().toLocaleTimeString()}</p></div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onCoordinatorClick} className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"><IconCheckCircle className="h-5 w-5 mr-2" /> Validação</button>
        <button onClick={onDashboardClick} className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"><IconDashboard className="h-5 w-5 mr-2" /> Ver Dashboard</button>
      </div>
    </div>
  </header>
);

const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => (
    <div className="flex items-center justify-center my-8">
        <div className="flex items-center">
            <div className={`flex items-center justify-center rounded-full h-10 w-10 font-bold text-lg transition-colors duration-300 ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>1</div>
            <p className={`ml-3 font-semibold transition-colors duration-300 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>Dados do Relatório</p>
        </div>
        <div className={`flex-auto border-t-2 mx-4 transition-colors duration-300 ${currentStep > 1 ? 'border-blue-600' : 'border-gray-300'}`}></div>
        <div className="flex items-center">
            <div className={`flex items-center justify-center rounded-full h-10 w-10 font-bold text-lg transition-colors duration-300 ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>2</div>
            <p className={`ml-3 font-semibold transition-colors duration-300 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>Assinaturas Digitais</p>
        </div>
    </div>
);

// --- Main Form Component ---
interface ReportFormProps {
  formData: ReportData;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onRadioChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ReportData>>;
  onFinalSubmit: (data: ReportData) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ formData, onInputChange, onRadioChange, setFormData, onFinalSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => setCurrentStep(prev => prev + 1);
  const handlePrevStep = () => setCurrentStep(prev => prev - 1);
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onFinalSubmit(formData);
      setCurrentStep(1); // Reset to first step for next report
  };

  return (
    <div className="bg-white p-8 rounded-b-lg shadow-lg">
        <Stepper currentStep={currentStep} />
        
        {currentStep === 1 && (
            <>
              <Section title="Informações Básicas" icon={<IconBuilding className="h-6 w-6" />} color="bg-blue-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2"><FormField label="Congregação" name="congregacao" value={formData.congregacao} onChange={onInputChange} required placeholder="Digite o nome da congregação" /></div>
                      <FormField label="Área" name="area" value={formData.area} onChange={onInputChange} required isSelect options={AREAS} />
                      <FormField label="Mês" name="mes" value={formData.mes} onChange={onInputChange} required isSelect options={MONTHS} />
                      <FormField label="Ano" name="ano" value={formData.ano} onChange={onInputChange} required />
                      <FormField label="WhatsApp para Confirmação (opcional)" name="whatsapp" value={formData.whatsapp} onChange={onInputChange} placeholder="(11) 99999-9999" />
                  </div>
              </Section>
              
              <Section title="Matrículas na CEAD" icon={<IconGraduationCap className="h-6 w-6" />} color="bg-green-600">
                  <InfoBox color="blue">Este campo é calculado automaticamente pela soma das categorias abaixo</InfoBox>
                  <FormField label="Total de Matriculados" name="ceadTotal" value={formData.ceadTotal} onChange={()=>{}} type="number" />
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormField label="Dirigente" name="ceadDirigente" value={formData.ceadDirigente} onChange={onInputChange} type="number" />
                      <FormField label="Vice Dirigente" name="ceadViceDirigente" value={formData.ceadViceDirigente} onChange={onInputChange} type="number" />
                      <FormField label="Secretária" name="ceadSecretaria" value={formData.ceadSecretaria} onChange={onInputChange} type="number" />
                      <FormField label="Vice Secretária" name="ceadViceSecretaria" value={formData.ceadViceSecretaria} onChange={onInputChange} type="number" />
                      <FormField label="Adultos" name="ceadAdultos" value={formData.ceadAdultos} onChange={onInputChange} type="number" />
                      <FormField label="Jovens" name="ceadJovens" value={formData.ceadJovens} onChange={onInputChange} type="number" />
                      <FormField label="Adolescentes" name="ceadAdolescentes" value={formData.ceadAdolescentes} onChange={onInputChange} type="number" />
                      <FormField label="Crianças" name="ceadCriancas" value={formData.ceadCriancas} onChange={onInputChange} type="number" />
                  </div>
              </Section>

              <Section title="Atividades Realizadas" icon={<IconClipboardList className="h-6 w-6" />} color="bg-blue-600">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Evangelismo Pessoal" name="ativEvangelismoPessoal" value={formData.ativEvangelismoPessoal} onChange={onInputChange} type="number" />
                      <FormField label="Evangelismo Trânsito" name="ativEvangelismoTransito" value={formData.ativEvangelismoTransito} onChange={onInputChange} type="number" />
                      <FormField label="Evangelismo Infantil" name="ativEvangelismoInfantil" value={formData.ativEvangelismoInfantil} onChange={onInputChange} type="number" />
                      <FormField label="Evangelismo no Lar" name="ativEvangelismoNoLar" value={formData.ativEvangelismoNoLar} onChange={onInputChange} type="number" />
                      <FormField label="Evangelismo Noturno" name="ativEvangelismoNoturno" value={formData.ativEvangelismoNoturno} onChange={onInputChange} type="number" />
                      <FormField label="Culto Relâmpago" name="ativCultoRelampago" value={formData.ativCultoRelampago} onChange={onInputChange} type="number" />
                      <FormField label="Culto Mensal" name="ativCultoMensal" value={formData.ativCultoMensal} onChange={onInputChange} type="number" />
                      <FormField label="Culto de Missões" name="ativCultoMissoes" value={formData.ativCultoMissoes} onChange={onInputChange} type="number" />
                      <FormField label="Ponto de Pregação" name="ativPontoPregacao" value={formData.ativPontoPregacao} onChange={onInputChange} type="number" />
                      <FormField label="Domingo" name="ativDomingo" value={formData.ativDomingo} onChange={onInputChange} isSelect options={WEEK_DAYS} />
                      <FormField label="Culto Rodízio" name="ativCultoRodizio" value={formData.ativCultoRodizio} onChange={onInputChange} type="number" />
                      <FormField label="Consagração" name="ativConsagracao" value={formData.ativConsagracao} onChange={onInputChange} type="number" />
                      <FormField label="Concentração Evangélica" name="ativConcentracaoEvangelica" value={formData.ativConcentracaoEvangelica} onChange={onInputChange} type="number" />
                      <FormField label="Visita aos Enfermos" name="ativVisitaEnfermos" value={formData.ativVisitaEnfermos} onChange={onInputChange} type="number" />
                      <FormField label="Visita aos Não Convertidos" name="ativVisitaNaoConvertidos" value={formData.ativVisitaNaoConvertidos} onChange={onInputChange} type="number" />
                      <FormField label="Culto Jovem" name="ativCultoJovem" value={formData.ativCultoJovem} onChange={onInputChange} type="number" />
                  </div>
              </Section>
              
              <Section title="Frequência nas Orações" icon={<IconUsers className="h-6 w-6" />} color="bg-purple-600">
                  <InfoBox color="purple">Informe quantas vezes cada categoria participou das orações durante o mês</InfoBox>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Dirigente" name="freqDirigente" value={formData.freqDirigente} onChange={onInputChange} type="number" />
                      <FormField label="Vice Dirigente" name="freqViceDirigente" value={formData.freqViceDirigente} onChange={onInputChange} type="number" />
                      <FormField label="Secretária" name="freqSecretaria" value={formData.freqSecretaria} onChange={onInputChange} type="number" />
                      <FormField label="Vice Secretária" name="freqViceSecretaria" value={formData.freqViceSecretaria} onChange={onInputChange} type="number" />
                      <FormField label="Adultos" name="freqAdultos" value={formData.freqAdultos} onChange={onInputChange} type="number" />
                      <FormField label="Jovens" name="freqJovens" value={formData.freqJovens} onChange={onInputChange} type="number" />
                      <FormField label="Adolescentes" name="freqAdolescentes" value={formData.freqAdolescentes} onChange={onInputChange} type="number" />
                      <FormField label="Crianças" name="freqCriancas" value={formData.freqCriancas} onChange={onInputChange} type="number" />
                  </div>
              </Section>
              
              <Section title="Conversões" icon={<IconHeart className="h-6 w-6" />} color="bg-red-600">
                  <InfoBox color="red">Informe o total de conversões/decisões por Cristo registradas durante o mês</InfoBox>
                  <FormField label="Total de Conversões" name="totalConversoes" value={formData.totalConversoes} onChange={onInputChange} type="number" description="Inclui decisões de fé, reconciliações e rededições de vida" />
              </Section>

              <Section title="Bênçãos Agradecidas" icon={<IconGift className="h-6 w-6" />} color="bg-yellow-500">
                  <InfoBox color="yellow">Registre as bênçãos especiais que Deus concedeu à congregação durante o mês</InfoBox>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Batismos" name="bencaosBatismos" value={formData.bencaosBatismos} onChange={onInputChange} type="number" description="Batismos nas águas" />
                      <FormField label="Renovos" name="bencaosRenovos" value={formData.bencaosRenovos} onChange={onInputChange} type="number" description="Renovação espiritual" />
                      <FormField label="Curas Divinas" name="bencaosCurasDivinas" value={formData.bencaosCurasDivinas} onChange={onInputChange} type="number" description="Curas e milagres" />
                      <FormField label="Outros" name="bencaosOutros" value={formData.bencaosOutros} onChange={onInputChange} type="number" description="Outras bênçãos especiais" />
                  </div>
                  <div className="mt-6 bg-gray-50 p-4 rounded-md"><h4 className="font-semibold text-gray-700">Exemplos de outras bênçãos:</h4><ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1"><li>Libertações espirituais</li><li>Bênçãos financeiras e materiais</li><li>Restauração familiar</li><li>Provisão sobrenatural</li><li>Proteção divina em situações de perigo</li></ul></div>
              </Section>
              
              <Section title="Literatura Distribuída" icon={<IconBookOpen className="h-6 w-6" />} color="bg-cyan-600">
                  <InfoBox color="blue">Registre a quantidade total de materiais evangelísticos distribuídos durante o mês</InfoBox>
                  <FormField label="Quantidade Distribuída" name="literaturaQuantidade" value={formData.literaturaQuantidade} onChange={onInputChange} type="number" description="Total de peças distribuídas (folhetos, revistas, livros, etc.)" />
                  <div className="mt-6 bg-gray-50 p-4 rounded-md"><h4 className="font-semibold text-gray-700">Tipos de literatura evangelística:</h4><ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1"><li>Folhetos evangelísticos</li><li>Revistas da Escola Dominical</li><li>Livros cristãos</li><li>Bíblias e Novos Testamentos</li><li>Materiais de discipulado</li><li>Convites para eventos</li></ul></div>
              </Section>

              <Section title="Atividades da Área" icon={<IconLocationMarker className="h-6 w-6" />} color="bg-indigo-600">
                  <InfoBox color="blue">Registre a participação da congregação nas atividades organizadas pela área</InfoBox>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField label="Conferência Missionária" name="areaConferenciaMissionaria" value={formData.areaConferenciaMissionaria} onChange={onInputChange} type="number" description="Participantes da congregação" />
                       <FormField label="Pré-Congresso" name="areaPreCongresso" value={formData.areaPreCongresso} onChange={onInputChange} type="number" description="Participantes da congregação" />
                       <FormField label="Formatura de Discipulado" name="areaFormaturaDiscipulado" value={formData.areaFormaturaDiscipulado} onChange={onInputChange} type="number" description="Formandos da congregação" />
                       <FormField label="Cruzada Evangelística" name="areaCruzadaEvangelistica" value={formData.areaCruzadaEvangelistica} onChange={onInputChange} type="number" description="Participantes da congregação" />
                       <FormField label="Culto Jovens Unificado" name="areaCultoJovensUnificado" value={formData.areaCultoJovensUnificado} onChange={onInputChange} type="number" description="Jovens participantes" />
                       <FormField label="Sábado do Culto Jovens" name="areaSabadoCultoJovens" value={formData.areaSabadoCultoJovens} onChange={onInputChange} isSelect options={SABADO_CULTOS} />
                  </div>
                   <div className="mt-6 bg-gray-50 p-4 rounded-md"><h4 className="font-semibold text-gray-700">Observações importantes:</h4><ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1"><li>Registre apenas participantes efetivos da sua congregação</li><li>Não conte visitantes de outras congregações</li><li>Informe "0" se a atividade não ocorreu no período</li><li>Mantenha registro dos nomes para controle interno</li></ul></div>
              </Section>
              
              <Section title="Discipulado Completo" icon={<IconUsers className="h-6 w-6" />} color="bg-purple-600">
                  <InfoBox color="purple">Preencha todas as informações sobre o discipulado da congregação</InfoBox>
                  <div className="mb-8"><h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Turmas e Professores</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Turmas Básico" name="discTurmasBasico" value={formData.discTurmasBasico} onChange={onInputChange} type="number" />
                      <FormField label="Turmas Intermediário" name="discTurmasIntermediario" value={formData.discTurmasIntermediario} onChange={onInputChange} type="number" />
                      <FormField label="Turmas Avançado" name="discTurmasAvancado" value={formData.discTurmasAvancado} onChange={onInputChange} type="number" />
                      <FormField label="Total de Turmas" name="discTotalTurmas" value={formData.discTotalTurmas} onChange={()=>{}} type="number" description="Calculado automaticamente" />
                      <FormField label="Total de Professores" name="discTotalProfessores" value={formData.discTotalProfessores} onChange={onInputChange} type="number" />
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Possui Responsável de Discipulado</label><div className="flex items-center space-x-4 mt-2"><label className="flex items-center"><input type="radio" name="discPossuiResponsavel" value="sim" checked={formData.discPossuiResponsavel === 'sim'} onChange={onRadioChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">Sim</span></label><label className="flex items-center"><input type="radio" name="discPossuiResponsavel" value="nao" checked={formData.discPossuiResponsavel === 'nao'} onChange={onRadioChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">Não</span></label></div></div>
                  </div></div>
                  <div className="mb-8"><h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Alunos por Nível</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField label="Alunos Básico" name="discAlunosBasico" value={formData.discAlunosBasico} onChange={onInputChange} type="number" />
                       <FormField label="Alunos Intermediário" name="discAlunosIntermediario" value={formData.discAlunosIntermediario} onChange={onInputChange} type="number" />
                       <FormField label="Alunos Avançado" name="discAlunosAvancado" value={formData.discAlunosAvancado} onChange={onInputChange} type="number" />
                       <FormField label="Total de Alunos" name="discTotalAlunos" value={formData.discTotalAlunos} onChange={()=>{}} type="number" description="Calculado automaticamente" />
                  </div></div>
                  <div className="mb-8"><h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Alunos por Faixa Etária</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField label="Adolescentes" name="discAlunosAdolescentes" value={formData.discAlunosAdolescentes} onChange={onInputChange} type="number" />
                       <FormField label="Jovens" name="discAlunosJovens" value={formData.discAlunosJovens} onChange={onInputChange} type="number" />
                       <FormField label="Adultos" name="discAlunosAdultos" value={formData.discAlunosAdultos} onChange={onInputChange} type="number" />
                       <FormField label="Idosos" name="discAlunosIdosos" value={formData.discAlunosIdosos} onChange={onInputChange} type="number" />
                       <div className="md:col-span-2"><FormField label="PcD" name="discAlunosPcd" value={formData.discAlunosPcd} onChange={onInputChange} type="number" description="Pessoas com Deficiência" /></div>
                  </div></div>
                  <div><h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Frequência e Novos Alunos</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField label="Total de Presenças" name="discFreqTotalPresencas" value={formData.discFreqTotalPresencas} onChange={onInputChange} type="number" />
                       <FormField label="Total de Ausências" name="discFreqTotalAusencias" value={formData.discFreqTotalAusencias} onChange={onInputChange} type="number" />
                       <FormField label="Novos Alunos no Mês" name="discFreqNovosAlunosMes" value={formData.discFreqNovosAlunosMes} onChange={onInputChange} type="number" />
                       <FormField label="Concluintes Aguardando Batismo" name="discFreqConcluintesAguardandoBatismo" value={formData.discFreqConcluintesAguardandoBatismo} onChange={onInputChange} type="number" />
                  </div></div>
              </Section>
              
              <Section title="Atividades Ministeriais" icon={<IconBriefcase className="h-6 w-6" />} color="bg-gray-700">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField label="Visitas a Novos Convertidos" name="ministVisitasNovosConvertidos" value={formData.ministVisitasNovosConvertidos} onChange={onInputChange} type="number" />
                       <FormField label="Aconselhamento Individual" name="ministAconselhamentoIndividual" value={formData.ministAconselhamentoIndividual} onChange={onInputChange} type="number" />
                       <FormField label="Visitas Ministeriais" name="ministVisitasMinisteriais" value={formData.ministVisitasMinisteriais} onChange={onInputChange} type="number" />
                       <FormField label="Visitas de Apoios da Área" name="ministVisitasApoiosArea" value={formData.ministVisitasApoiosArea} onChange={onInputChange} type="number" />
                       <div className="md:col-span-2"><FormField label="Dias que Discipulado Formou em Cultos" name="ministDiasDiscipuladoFormouCultos" value={formData.ministDiasDiscipuladoFormouCultos} onChange={onInputChange} type="number" description="Máximo 31 dias" /></div>
                  </div>
              </Section>

              <div className="flex justify-end mt-8"><button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center">Próximo: Assinaturas Digitais <span className="ml-2">→</span></button></div>
            </>
        )}

        {currentStep === 2 && (
            <form onSubmit={handleSubmit}>
                <Section title="Assinaturas Digitais" icon={<IconShieldCheck className="h-6 w-6" />} color="bg-teal-600">
                    <InfoBox color="blue">Ao preencher seu nome completo abaixo, você confirma a veracidade de todas as informações contidas neste relatório. Esta ação tem validade de assinatura digital.</InfoBox>
                    <div className="space-y-6">
                        <FormField label="Assinatura do Dirigente da Congregação" name="dirigenteAssinatura" value={formData.dirigenteAssinatura} onChange={onInputChange} required placeholder="Digite o nome completo do Dirigente"/>
                        <FormField label="Assinatura da Secretária de Missões" name="secretariaAssinatura" value={formData.secretariaAssinatura} onChange={onInputChange} required placeholder="Digite o nome completo da Secretária"/>
                    </div>
                </Section>
                <div className="flex justify-between items-center mt-8">
                    <button type="button" onClick={handlePrevStep} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"><span className="mr-2">←</span> Voltar</button>
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={!formData.dirigenteAssinatura || !formData.secretariaAssinatura}><IconCheckCircle className="h-5 w-5 mr-2" /> Enviar para Validação</button>
                </div>
            </form>
        )}
    </div>
  );
};

const AuthModal: React.FC<{ title: string; description: string; onAuthSuccess: () => void; onClose: () => void; correctPassword: string; }> = ({ title, description, onAuthSuccess, onClose, correctPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleAuth = () => {
    if (password === correctPassword) { onAuthSuccess(); } 
    else { setError('Senha incorreta. Tente novamente.'); setPassword(''); }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') { handleAuth(); } };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} placeholder="Digite a senha" className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" autoFocus />
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Cancelar</button>
          <button onClick={handleAuth} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Acessar</button>
        </div>
      </div>
    </div>
  );
};

interface SubmittedReport {
  data: ReportData;
  status: 'pending' | 'validated';
}

const CoordinatorView: React.FC<{ onBack: () => void; reports: SubmittedReport[]; onValidate: (index: number) => void; }> = ({ onBack, reports, onValidate }) => {
  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
        <div className="flex justify-between items-center mb-8 border-b-2 border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-gray-800">Portal de Validação do Coordenador</h1>
            <button onClick={onBack} className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                <IconArrowLeft className="h-5 w-5 mr-2" /> Voltar ao Formulário
            </button>
        </div>

        {pendingReports.length === 0 ? (
          <div className="text-center py-12">
            <IconCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">Tudo Certo!</h2>
            <p className="text-gray-500 mt-2">Nenhum relatório pendente de validação no momento.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map((report, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md border-l-4 ${report.status === 'pending' ? 'bg-white border-yellow-500' : 'bg-green-50 border-green-500'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-bold text-gray-800">{report.data.congregacao}</p>
                    <p className="text-sm text-gray-500">{report.data.area} - {report.data.mes}/{report.data.ano}</p>
                    <p className="text-sm text-gray-600 mt-2">Enviado por: {report.data.dirigenteAssinatura}</p>
                  </div>
                  <div>
                    {report.status === 'pending' ? (
                      <button onClick={() => onValidate(index)} className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        <IconCheckCircle className="h-5 w-5 mr-2" /> Validar Relatório
                      </button>
                    ) : (
                      <div className="flex items-center text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-full">
                        <IconCheckCircle className="h-5 w-5 mr-2" /> Validado
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};


const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'dashboard' | 'coordinator'>('form');
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCoordinatorModal, setShowCoordinatorModal] = useState(false);
  const [formData, setFormData] = useState<ReportData>(initialFormData);
  const [submittedReports, setSubmittedReports] = useState<SubmittedReport[]>([]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;
    if (type === 'number') {
        processedValue = value === '' ? 0 : parseInt(value, 10);
        if (isNaN(processedValue as number)) { processedValue = 0; }
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  }, []);
  
  const handleRadioChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as 'sim' | 'nao' }));
  }, []);

  useEffect(() => {
    const { ceadDirigente, ceadViceDirigente, ceadSecretaria, ceadViceSecretaria, ceadAdultos, ceadJovens, ceadAdolescentes, ceadCriancas } = formData;
    const total = ceadDirigente + ceadViceDirigente + ceadSecretaria + ceadViceSecretaria + ceadAdultos + ceadJovens + ceadAdolescentes + ceadCriancas;
    setFormData(prev => ({ ...prev, ceadTotal: total }));
  }, [formData.ceadDirigente, formData.ceadViceDirigente, formData.ceadSecretaria, formData.ceadViceSecretaria, formData.ceadAdultos, formData.ceadJovens, formData.ceadAdolescentes, formData.ceadCriancas]);

  useEffect(() => {
    const { discTurmasBasico, discTurmasIntermediario, discTurmasAvancado } = formData;
    const total = discTurmasBasico + discTurmasIntermediario + discTurmasAvancado;
    setFormData(prev => ({ ...prev, discTotalTurmas: total }));
  }, [formData.discTurmasBasico, formData.discTurmasIntermediario, formData.discTurmasAvancado]);

  useEffect(() => {
    const { discAlunosBasico, discAlunosIntermediario, discAlunosAvancado } = formData;
    const total = discAlunosBasico + discAlunosIntermediario + discAlunosAvancado;
    setFormData(prev => ({ ...prev, discTotalAlunos: total }));
  }, [formData.discAlunosBasico, formData.discAlunosIntermediario, formData.discAlunosAvancado]);

  const handleDataExport = () => {
    const headers = Object.keys(formData).map(key => fieldLabels[key as keyof ReportData] || key).join(',');
    const values = Object.values(formData).map(value => {
        const strValue = String(value);
        return strValue.includes(',') ? `"${strValue}"` : strValue;
    }).join(',');
    const csvContent = `${headers}\n${values}`;
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'relatorio_ieadpe.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (data: ReportData) => {
    setSubmittedReports(prev => [...prev, { data, status: 'pending' }]);
    setFormData(initialFormData);
    alert('Relatório enviado com sucesso para validação do Coordenador!');
  };
  
  const handleValidateReport = (indexToValidate: number) => {
    setSubmittedReports(prev => 
      prev.map((report, index) => 
        index === indexToValidate ? { ...report, status: 'validated' } : report
      )
    );
  };


  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-16 bg-gradient-to-b from-purple-600 to-indigo-700 flex-shrink-0 hidden md:block"></div>
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {view === 'form' && (
              <>
                <Header onDashboardClick={() => setShowDashboardModal(true)} onCoordinatorClick={() => setShowCoordinatorModal(true)} />
                <div className="bg-white p-6 shadow-lg">
                  <button onClick={() => setShowExportModal(true)} className="flex items-center w-full justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                      <IconExport className="h-5 w-5 mr-2" /> Exportar para Excel
                  </button>
                </div>
                <ReportForm formData={formData} onInputChange={handleInputChange} onRadioChange={handleRadioChange} setFormData={setFormData} onFinalSubmit={handleFormSubmit} />
              </>
            )}
            {view === 'dashboard' && <Dashboard onBack={() => setView('form')} />}
            {view === 'coordinator' && <CoordinatorView onBack={() => setView('form')} reports={submittedReports} onValidate={handleValidateReport} />}
          </div>
        </main>
        <div className="w-16 bg-gradient-to-b from-blue-500 to-cyan-500 flex-shrink-0 hidden md:block"></div>
      </div>
      
      {showDashboardModal && (
        <AuthModal 
          title="Acesso ao Dashboard"
          description="Por favor, insira a senha para visualizar o dashboard."
          onAuthSuccess={() => { setView('dashboard'); setShowDashboardModal(false); }}
          onClose={() => setShowDashboardModal(false)}
          correctPassword="dashboard123"
        />
      )}

      {showCoordinatorModal && (
        <AuthModal 
          title="Acesso do Coordenador"
          description="Por favor, insira a senha de coordenador para validar os relatórios."
          onAuthSuccess={() => { setView('coordinator'); setShowCoordinatorModal(false); }}
          onClose={() => setShowCoordinatorModal(false)}
          correctPassword="coordenador123"
        />
      )}

      {showExportModal && (
        <AuthModal 
          title="Exportar Relatório"
          description="Por favor, insira a senha para exportar os dados para Excel (CSV)."
          onAuthSuccess={() => { handleDataExport(); setShowExportModal(false); }}
          onClose={() => setShowExportModal(false)}
          correctPassword="dashboard123"
        />
      )}
    </>
  );
}

export default App;
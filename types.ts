export interface ReportData {
  congregacao: string;
  area: string;
  mes: string;
  ano: string;
  whatsapp: string;

  // Matrículas na CEAD
  ceadDirigente: number;
  ceadViceDirigente: number;
  ceadSecretaria: number;
  ceadViceSecretaria: number;
  ceadAdultos: number;
  ceadJovens: number;
  ceadAdolescentes: number;
  ceadCriancas: number;
  ceadTotal: number;

  // Atividades Realizadas
  ativEvangelismoPessoal: number;
  ativEvangelismoTransito: number;
  ativEvangelismoInfantil: number;
  ativEvangelismoNoLar: number;
  ativEvangelismoNoturno: number;
  ativCultoRelampago: number;
  ativCultoMensal: number;
  ativCultoMissoes: number;
  ativPontoPregacao: number;
  ativDomingo: string;
  ativCultoRodizio: number;
  ativConsagracao: number;
  ativConcentracaoEvangelica: number;
  ativVisitaEnfermos: number;
  ativVisitaNaoConvertidos: number;
  ativCultoJovem: number;

  // Frequência nas Orações
  freqDirigente: number;
  freqViceDirigente: number;
  freqSecretaria: number;
  freqViceSecretaria: number;
  freqAdultos: number;
  freqJovens: number;
  freqAdolescentes: number;
  freqCriancas: number;

  // Conversões
  totalConversoes: number;

  // Bênçãos Agradecidas
  bencaosBatismos: number;
  bencaosRenovos: number;
  bencaosCurasDivinas: number;
  bencaosOutros: number;

  // Literatura Distribuída
  literaturaQuantidade: number;

  // Atividades da Área
  areaConferenciaMissionaria: number;
  areaPreCongresso: number;
  areaFormaturaDiscipulado: number;
  areaCruzadaEvangelistica: number;
  areaCultoJovensUnificado: number;
  areaSabadoCultoJovens: string;

  // Discipulado Completo
  discTurmasBasico: number;
  discTurmasIntermediario: number;
  discTurmasAvancado: number;
  discTotalTurmas: number;
  discTotalProfessores: number;
  discPossuiResponsavel: 'sim' | 'nao';
  discAlunosBasico: number;
  discAlunosIntermediario: number;
  discAlunosAvancado: number;
  discTotalAlunos: number;
  discAlunosAdolescentes: number;
  discAlunosJovens: number;
  discAlunosAdultos: number;
  discAlunosIdosos: number;
  discAlunosPcd: number;
  discFreqTotalPresencas: number;
  discFreqTotalAusencias: number;
  discFreqNovosAlunosMes: number;
  discFreqConcluintesAguardandoBatismo: number;

  // Atividades Ministeriais
  ministVisitasNovosConvertidos: number;
  ministAconselhamentoIndividual: number;
  ministVisitasMinisteriais: number;
  ministVisitasApoiosArea: number;
  ministDiasDiscipuladoFormouCultos: number;

  // Assinaturas
  dirigenteAssinatura: string;
  secretariaAssinatura: string;
}
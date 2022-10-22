import {
  mdiAccountCircle,
  mdiAccountGroup,
  mdiPlus,
  mdiDesktopMac,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiMonitorShimmer,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive
} from '@mdi/js'

export default [
  'Admin',
  [
    {
      to: '/',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'Pemilih',
  [
	{
      to: '/DPT',
      icon: mdiAccountGroup,
      label: 'DPT'
    },
  	{
      to: '/newUser',
      icon: mdiPlus,
      label: 'Tambah Pemilih'
    }
  ],
  'Kandidat',
  [
  	{
      to: '/candidates',
      icon: mdiAccountGroup,
      label: 'Pasangan Calon'
    },
    {
      to: '/newCandidate',
      icon: mdiPlus,
      label: 'Tambah Paslon'
    }
  ],
  'Acara',
  [
  	{
      to: '/event',
      icon: mdiPlus,
      label: 'Kelola Acara'
    }
  ]
]

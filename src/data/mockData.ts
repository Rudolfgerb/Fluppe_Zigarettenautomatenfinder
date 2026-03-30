export interface VendingMachine {
  id: string;
  lat: number;
  lng: number;
  address: string;
  status: 'functional' | 'defective';
  rating: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

export const MOCK_MACHINES: VendingMachine[] = [
  {
    id: '1',
    lat: 52.5200,
    lng: 13.4050,
    address: 'Alexanderplatz 1, 10178 Berlin',
    status: 'functional',
    rating: 4.5,
    comments: [
      { id: 'c1', user: 'Raucher88', text: 'Immer voll, Kartenzahlung geht.', date: '2024-03-20' },
      { id: 'c2', user: 'NikotinFan', text: 'Bester Automat in der Gegend.', date: '2024-03-18' }
    ]
  },
  {
    id: '2',
    lat: 52.5186,
    lng: 13.3761,
    address: 'Brandenburger Tor, 10117 Berlin',
    status: 'defective',
    rating: 2.0,
    comments: [
      { id: 'c3', user: 'Tourist123', text: 'Nimmt kein Geld an.', date: '2024-03-25' }
    ]
  },
  {
    id: '3',
    lat: 52.5065,
    lng: 13.3321,
    address: 'Kurfürstendamm 21, 10719 Berlin',
    status: 'functional',
    rating: 5.0,
    comments: [
      { id: 'c4', user: 'KudammKing', text: 'Alles super.', date: '2024-03-28' }
    ]
  },
  {
    id: '4',
    lat: 52.4911,
    lng: 13.3531,
    address: 'Yorckstraße 45, 10965 Berlin',
    status: 'functional',
    rating: 3.8,
    comments: []
  },
  {
    id: '5',
    lat: 53.5511,
    lng: 9.9937,
    address: 'Jungfernstieg, 20354 Hamburg',
    status: 'functional',
    rating: 4.2,
    comments: []
  },
  {
    id: '6',
    lat: 48.1351,
    lng: 11.5820,
    address: 'Marienplatz, 80331 München',
    status: 'functional',
    rating: 4.7,
    comments: []
  },
  {
    id: '7',
    lat: 50.9375,
    lng: 6.9603,
    address: 'Hohenzollernbrücke, 50667 Köln',
    status: 'defective',
    rating: 1.5,
    comments: []
  },
  {
    id: '8',
    lat: 50.1109,
    lng: 8.6821,
    address: 'Römerberg, 60311 Frankfurt am Main',
    status: 'functional',
    rating: 4.0,
    comments: []
  }
];

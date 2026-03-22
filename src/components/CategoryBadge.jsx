export default function CategoryBadge({ category }) {
  const categories = {
    'Restaurant': { color: 'text-indigo', bg: 'bg-indigo/20', border: 'border-indigo/30' },
    'Cafe': { color: 'text-amber-400', bg: 'bg-amber-400/20', border: 'border-amber-400/30' },
    'Shop': { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/30' },
    'Hotel': { color: 'text-sky-400', bg: 'bg-sky-400/20', border: 'border-sky-400/30' },
    'Gym': { color: 'text-violet-400', bg: 'bg-violet-400/20', border: 'border-violet-400/30' },
    'default': { color: 'text-gray-400', bg: 'bg-gray-400/20', border: 'border-gray-400/30' }
  }

  const { color, bg, border } = categories[category] || categories['default']

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${bg} ${color} ${border}`}>
      {category}
    </span>
  )
}

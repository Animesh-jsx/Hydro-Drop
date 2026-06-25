const fs = require('fs');
const file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /  useEffect\(\(\) => \{\n    setMobileOpen\(false\)\n  \}, \[location\.pathname\]\)\n\n/g,
  ''
);

content = content.replace(
  /<Link\n                    to=\{link\.path\}\n                    className=/g,
  '<Link\n                    to={link.path}\n                    onClick={() => setMobileOpen(false)}\n                    className='
);

content = content.replace(
  /<a\n                  href="tel:\+916291721441"\n                  className="flex items-center justify-center gap-2 bg-primary-darkest text-white px-6 py-3 rounded-full font-semibold text-sm"/g,
  '<a\n                  href="tel:+916291721441"\n                  onClick={() => setMobileOpen(false)}\n                  className="flex items-center justify-center gap-2 bg-primary-darkest text-white px-6 py-3 rounded-full font-semibold text-sm"'
);

fs.writeFileSync(file, content, 'utf8');

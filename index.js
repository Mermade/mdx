var fs = require('fs');

if (process.argv.length>2) {
	for (let i=2;i<process.argv.length;i++) {
		let lines = fs.readFileSync(process.argv[i],'utf8').split('\r').join('').split('\n');
		let counter = 1;
		let inFence = false;
		let title = 'example';
		let extension = 'txt';
		let example = '';
		for (let line of lines) {
			if (line.startsWith('```')) {
				if (inFence) {
					let fname = process.argv[i].split('\\').join('/').split('/').join('_');
					fs.writeFileSync(title+counter+'_from_'+fname+'.'+extension,example,'utf8');
					example = '';
					counter++;
					extension = 'txt';
					inFence = false;
				}
				else {
					inFence = true;
					extension = line.split('`').pop().trim();
					if (!extension) extension = 'txt';
				}
			}
			else if (inFence) {
				example += line + '\n';
			}
			//if ((!inFence) && (line.startsWith('#'))) {
			//	title = line.split('#').pop().split(' ').join('_');
			//}
		}
	}
}

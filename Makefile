test:
	npm test

make install:
	npm install

lint:
	npx eslint .

fix:
	npx eslint --fix .

publish:
	npm publish

.PHONY: test
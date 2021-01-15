build: clean
build:
	mkdir -p build
	cp -rf ./src/css ./build/css
	cp -f ./src/*.html ./build
	tsc

clean:
	rm -rf build
	rm -f ./src/ts/*.js

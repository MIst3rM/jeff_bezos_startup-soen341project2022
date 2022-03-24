FROM cypress/included:9.5.1-node16.14.0-slim-chrome99-ff97

COPY ./wait-for-it.sh /usr/local/bin/wait-for-it.sh

ENTRYPOINT [ "/usr/local/bin/wait-for-it.sh", "http://store.conco", "-t", "60", "--", "cypress", "run", "--browser", "chrome"]

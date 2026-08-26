FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod main.go ./
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /analytics-collector .

FROM scratch
COPY --from=build /analytics-collector /analytics-collector
EXPOSE 8080
ENTRYPOINT ["/analytics-collector"]

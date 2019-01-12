variable "aws_access_key_id" {}

variable "aws_secret_access_key" {}

variable "region" {
  default = "us-east-1"
}

variable "domain" {
  default = "livimenezes.com"
}

variable "subdomain" {
  default = "www.livimenezes.com"
}

variable "cdn_subdomain" {
  default = "livimenezes.com"
}

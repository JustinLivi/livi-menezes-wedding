output "cloudfront_did" {
  value = "${aws_cloudfront_distribution.cdn.id}"
}

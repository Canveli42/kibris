<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
 xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8"/>
<xsl:template match="/">
<html lang="tr"><head><meta charset="utf-8"><title>Sitemap</title>
<style>
body{background:#0a1020;color:#e9eef6;font:14px/1.6 "Segoe UI",system-ui,sans-serif;padding:24px}
h1{font-size:20px;margin:0 0 4px}
p{color:#93a0b4;margin:0 0 18px}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{border-bottom:1px solid rgba(216,184,120,.18);padding:7px 10px;text-align:left}
th{color:#d8b878;font-weight:400;font-size:11px;letter-spacing:.1em;text-transform:uppercase}
a{color:#f0d9ae;text-decoration:none}
td.p{color:#93a0b4;white-space:nowrap}
</style></head><body>
<h1>RedKıbrıs · sitemap</h1>
<p><xsl:value-of select="count(sm:urlset/sm:url)"/> adres</p>
<table><tr><th>Adres</th><th>Güncelleme</th><th>Sıklık</th><th>Öncelik</th></tr>
<xsl:for-each select="sm:urlset/sm:url">
<tr><td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
<td class="p"><xsl:value-of select="sm:lastmod"/></td>
<td class="p"><xsl:value-of select="sm:changefreq"/></td>
<td class="p"><xsl:value-of select="sm:priority"/></td></tr>
</xsl:for-each>
</table></body></html>
</xsl:template>
</xsl:stylesheet>

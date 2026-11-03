# Private Windows Task Scheduler entrypoint for the read-only P4 review preview.
# Does NOT create a schedule, persist credentials, or send results to GitHub.
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[A-Za-z0-9_-]{15,}$')]
  [string] $SheetId,

  [Parameter(Mandatory = $false)]
  [ValidatePattern('^[A-Za-z0-9_-]{15,}$')]
  [string] $RootFolderId
)
$ErrorActionPreference = 'Stop'
if ([string]::IsNullOrWhiteSpace($env:GOOGLE_ACCESS_TOKEN)) {
  Write-Error 'GOOGLE_ACCESS_TOKEN_REQUIRED: provide a valid private OAuth token via a trusted runtime source.'
  exit 1
}

$node = Get-Command 'node' -ErrorAction Stop
$script = Join-Path $PSScriptRoot 'drive-source-resolver.mjs'
if (-not (Test-Path -LiteralPath $script -PathType Leaf)) {
  Write-Error 'LOCAL_REVIEW_CLI_NOT_FOUND'
  exit 1
}
$arguments = @($script, 'review', '--sheet-id', $SheetId, '--mode', 'summary')
if ($RootFolderId) {
  $arguments += @('--root-folder-id', $RootFolderId)
}
& $node.Source @arguments
$code = $LASTEXITCODE
if ($null -eq $code) { $code = 1 }
exit $code

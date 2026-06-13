import { NextRequest, NextResponse } from 'next/server';  
export async function POST(req: NextRequest)  
{ const url = new URL(req.url); const path = url.pathname.replace('/api/proxy', ''); const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:8080';  
const response = await fetch(\\\\, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': req.headers.get('Authorization') || '' }, body: await req.text() }); return new NextResponse(response.body, { status: response.status, headers: response.headers }); } 

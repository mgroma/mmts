// src/otel-bootstrap.ts import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'; import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'; import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'; import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';

import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'; import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';

import { Resource } from '@opentelemetry/resources'; import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

if (process.env.NODE_ENV !== 'production') { diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO); }

const resource = new Resource({ [SemanticResourceAttributes.SERVICE_NAME]: 'decorator-demo-app', [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'dev', });

const OTLP_URL = process.env.DT_OTLP_URL ?? 'https://<your-env>.live.dynatrace.com/api/v2/otlp'; const HEADERS = { Authorization: Api-Token ${process.env.DT_API_TOKEN} };

const traceExporter = new OTLPTraceExporter({ url: ${OTLP_URL}/v1/traces, headers: HEADERS, });

const tracerProvider = new NodeTracerProvider({ resource }); tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter)); tracerProvider.register();

const metricExporter = new OTLPMetricExporter({ url: ${OTLP_URL}/v1/metrics, headers: HEADERS, });

const meterProvider = new MeterProvider({ resource }); meterProvider.addMetricReader(new PeriodicExportingMetricReader({ exporter: metricExporter, exportIntervalMillis: 15000, }));

export const tracer = tracerProvider.getTracer('app-tracer'); export const meter = meterProvider.getMeter('app-meter');

process.on('SIGTERM', async () => { await Promise.all([ tracerProvider.shutdown(), meterProvider.shutdown(), ]); process.exit(0); });

// src/otel-decorators.ts import { Span, context, trace, SpanKind } from '@opentelemetry/api'; import { meter, tracer } from './otel-bootstrap';

function getFunctionName(target: any, propertyKey: string) { return target?.constructor?.name ? ${target.constructor.name}.${propertyKey} : propertyKey; }

export function TraceMethod(spanName?: string): MethodDecorator { return function ( target, propertyKey: string | symbol, descriptor: PropertyDescriptor ) { const originalMethod = descriptor.value; descriptor.value = function (...args: any[]) { const name = spanName || getFunctionName(target, propertyKey as string); const span = tracer.startSpan(name, { kind: SpanKind.INTERNAL }); return context.with(trace.setSpan(context.active(), span), async () => { try { const result = originalMethod.apply(this, args); if (result instanceof Promise) { return result.finally(() => span.end()); } else { span.end(); return result; } } catch (err) { span.recordException(err); span.setStatus({ code: 2, message: (err as Error).message }); span.end(); throw err; } }); }; return descriptor; }; }

export function CountMetric(metricName: string): MethodDecorator { const counter = meter.createCounter(metricName); return function ( target, propertyKey: string | symbol, descriptor: PropertyDescriptor ) { const originalMethod = descriptor.value; descriptor.value = function (...args: any[]) { counter.add(1, { method: propertyKey.toString(), class: target.constructor.name, }); return originalMethod.apply(this, args); }; return descriptor; }; }

export function ObserveDuration(metricName: string): MethodDecorator { const histogram = meter.createHistogram(metricName, { unit: 'ms', description: 'Duration of function execution', }); return function ( target, propertyKey: string | symbol, descriptor: PropertyDescriptor ) { const originalMethod = descriptor.value; descriptor.value = async function (...args: any[]) { const start = performance.now(); try { const result = await originalMethod.apply(this, args); return result; } finally { const duration = performance.now() - start; histogram.record(duration, { method: propertyKey.toString(), class: target.constructor.name, }); } }; return descriptor; }; }

// src/user.service.ts import { TraceMethod, CountMetric, ObserveDuration } from './otel-decorators';

export class UserService { @TraceMethod() @CountMetric('user_service.get_user.calls') @ObserveDuration('user_service.get_user.duration') async getUser(userId: string): Promise<any> { await new Promise((r) => setTimeout(r, Math.random() * 100)); return { id: userId, name: 'Jane Doe' }; } }

// src/main.ts import express from 'express'; import './otel-bootstrap'; import { UserService } from './user.service';

const app = express(); const port = 3000; const userService = new UserService();

app.get('/user/:id', async (req, res) => { const user = await userService.getUser(req.params.id); res.json(user); });

app.listen(port, () => { console.log(Server listening at http://localhost:${port}); });


/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global global, Office, self, window */

Office.onReady(() => {
  // If needed, Office.js is ready to be called
});

/**
 * Shows a notification when the add-in command is executed.
 * @param event
 */
function action(event: Office.AddinCommands.Event) {
  const message: Office.NotificationMessageDetails = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true
  };

  // Show a notification message
  Office.context.mailbox.item.notificationMessages.replaceAsync("action", message);

  // Be sure to indicate when the add-in command function is complete
  event.completed();
}

function getGlobal() {
  return typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : undefined;
}

const g = getGlobal() as any;

// the add-in command functions need to be available in global scope
g.action = action;
